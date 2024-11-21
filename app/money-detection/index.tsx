import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// Import các components con
import { CameraViewComponent } from './components/CameraView';
import { PermissionRequest } from './components/PermissionRequest';
import { ResultView } from './components/ResultView';
import { MoneyDetail } from './components/MoneyDetail';

const API_URL = 'http://18.183.241.9:8000';

const MoneyDetection = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [denomination, setDenomination] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);

  // Hàm xử lý khi nhấn nút chụp
  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      setIsLoading(true);
      // Chụp ảnh
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        skipProcessing: true,
      });

      // Lưu ảnh đã chụp
      setCapturedImage(photo?.uri || '');

      // Tạo form data
      const formData = new FormData();
      formData.append('file', {
        uri: photo?.uri,
        type: 'image/jpeg',
        name: 'money.jpg',
      } as any);

      // Gửi ảnh lên server
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000,
      });

      // Hiển thị kết quả
      const { denomination: denom, confidence: conf } = response.data;
      setDenomination(denom);
      setConfidence(conf);

    } catch (error) {
      console.error('Capture error:', error);
      setDenomination('');
      setConfidence(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm xử lý chọn ảnh từ thư viện
  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Cần quyền truy cập thư viện ảnh để thực hiện chức năng này!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0].uri) {
        setIsLoading(true);
        setCapturedImage(result.assets[0].uri);

        const formData = new FormData();
        formData.append('file', {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'money.jpg',
        } as any);

        const response = await axios.post(`${API_URL}/predict`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000,
        });

        const { denomination: denom, confidence: conf } = response.data;
        setDenomination(denom);
        setConfidence(conf);
      }
    } catch (error) {
      console.error('Pick image error:', error);
      setDenomination('');
      setConfidence(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm thử lại
  const handleRetry = () => {
    setCapturedImage(null);
    setDenomination('');
    setConfidence(0);
  };

  // Kiểm tra quyền camera
  if (!permission) return <View />;
  if (!permission.granted) {
    return <PermissionRequest onRequestPermission={requestPermission} />;
  }

  // Hiển thị kết quả nếu đã chụp ảnh
  if (capturedImage) {
    return (
      <>
        <ResultView
          capturedImage={capturedImage}
          isLoading={isLoading}
          denomination={denomination}
          confidence={confidence}
          onShowDetail={() => setShowDetail(true)}
          onRetry={handleRetry}
        />
        <Modal
          visible={showDetail}
          animationType="slide"
          onRequestClose={() => setShowDetail(false)}
          statusBarTranslucent
        >
          <MoneyDetail
            denomination={denomination}
            onClose={() => setShowDetail(false)}
          />
        </Modal>
      </>
    );
  }

  // Hiển thị camera
  return (
    <CameraViewComponent
      cameraRef={cameraRef}
      facing={facing}
      onCapture={handleCapture}
      onPickImage={handlePickImage}
    />
  );
};

export default MoneyDetection;
