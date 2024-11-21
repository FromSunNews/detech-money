import { CameraView as ExpoCamera } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface CameraViewProps {
  cameraRef: React.RefObject<ExpoCamera>;
  facing: 'front' | 'back';
  onCapture: () => void;
  onPickImage: () => void;
}

export const CameraViewComponent = ({
  cameraRef,
  facing,
  onCapture,
  onPickImage
}: CameraViewProps) => {
  return (
    <View style={styles.container}>
      <ExpoCamera
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          {/* Header với blur */}
          <BlurView intensity={50} tint="dark" style={styles.header}>
            <Ionicons name="scan" size={24} color="#fff" />
            <Text style={styles.headerText}>Nhận diện mệnh giá tiền</Text>
          </BlurView>

          {/* Khung nhận diện */}
          <GuideBox />

          {/* Controls với blur */}
          <View style={styles.controlsContainer}>
            <ControlButtons
              onCapture={onCapture}
              onPickImage={onPickImage}
            />
          </View>
        </View>
      </ExpoCamera>
    </View>
  );
};

// Tách component GuideBox
const GuideBox = () => (
  <View style={styles.guideBoxContainer}>
    <View style={styles.guideBox}>
      <View style={[styles.corner, styles.cornerTL]} />
      <View style={[styles.corner, styles.cornerTR]} />
      <View style={[styles.corner, styles.cornerBL]} />
      <View style={[styles.corner, styles.cornerBR]} />
    </View>
    <View style={styles.guideTextContainer}>
      <Text style={styles.guideText}>
        Đặt tiền vào khung hình để nhận diện
      </Text>
    </View>
  </View>
);

// Tách component ControlButtons
const ControlButtons = ({
  onCapture,
  onPickImage
}: {
  onCapture: () => void;
  onPickImage: () => void;
}) => (
  <View style={styles.buttonGroup}>
    <TouchableOpacity
      style={[styles.button, styles.galleryButton]}
      onPress={onPickImage}
    >
      <MaterialIcons name="photo-library" size={24} color="white" />
      <Text style={styles.buttonText}>Thư viện</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.button, styles.captureButton]}
      onPress={onCapture}
    >
      <Ionicons name="camera" size={24} color="white" />
      <Text style={styles.buttonText}>Chụp ảnh</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  guideBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideBox: {
    width: 280,
    height: 180,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderColor: '#2196F3',
    borderWidth: 3,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  guideTextContainer: {
    marginTop: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  guideText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  controlsContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 120 : 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 25,
    minWidth: 120,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  galleryButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
  },
  captureButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 