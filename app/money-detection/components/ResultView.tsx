import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface ResultViewProps {
  capturedImage: string;
  isLoading: boolean;
  denomination: string;
  confidence: number;
  onShowDetail: () => void;
  onRetry: () => void;
}

export const ResultView = ({
  capturedImage,
  isLoading,
  denomination,
  confidence = 0,
  onShowDetail,
  onRetry
}: ResultViewProps) => {
  // Hàm format số tiền và độ tin cậy
  const formatResult = (denomination: string, confidence: number) => {
    // Format số tiền theo định dạng tiền tệ Việt Nam
    const amount = denomination.replace(/[^0-9]/g, '');
    const formattedMoney = Number(amount).toLocaleString('vi-VN');
    // Format độ tin cậy với 1 số thập phân
    const formattedConfidence = (confidence * 100).toFixed(1);

    return {
      money: `${formattedMoney} VNĐ`,
      confidence: `Độ tin cậy: ${formattedConfidence}%`
    };
  };

  const result = formatResult(denomination, confidence);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: capturedImage }}
        style={styles.blurredBackground}
        blurRadius={10}
      />

      <Image
        source={{ uri: capturedImage }}
        style={styles.previewImage}
      />

      <BlurView intensity={50} tint="dark" style={styles.header}>
        <Ionicons name="image" size={24} color="#fff" />
        <Text style={styles.headerText}>Kết quả nhận diện</Text>
      </BlurView>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Đang nhận diện...</Text>
        </View>
      ) : (
        <>
          <View style={styles.controlsContainer}>
            <View style={styles.predictionContainer}>
              <Text style={styles.predictionLabel}>Kết quả nhận diện:</Text>
              <Text style={styles.predictionText}>{result.money}</Text>
              <Text style={styles.confidenceText}>{result.confidence}</Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.detailButton]}
                onPress={onShowDetail}
              >
                <Ionicons name="information-circle" size={24} color="white" />
                <Text style={styles.buttonText}>Chi tiết</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.retryButton]}
                onPress={onRetry}
              >
                <Ionicons name="camera-reverse" size={24} color="white" />
                <Text style={styles.buttonText}>Chụp lại</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurredBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  resultBox: {
    marginBottom: 20,
    alignItems: 'center',
  },
  predictionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  confidenceText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
  detailButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
  },
  retryButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  predictionContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  predictionLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    opacity: 0.8,
  }
}); 