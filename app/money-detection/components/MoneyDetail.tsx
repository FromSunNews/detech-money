import { StyleSheet, Text, View, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { moneyData } from '../data/moneyData';

interface MoneyDetailProps {
  denomination: string;
  onClose: () => void;
}

export const MoneyDetail = ({ denomination, onClose }: MoneyDetailProps) => {
  const cleanDenomination = denomination.replace(/[^0-9]/g, '').padStart(6, '0');
  const moneyInfo = moneyData[cleanDenomination];

  if (!moneyInfo) return null;

  return (
    <View style={styles.detailContainer}>
      <BlurView intensity={80} tint="dark" style={styles.modalHeader}>
        <View style={styles.headerContent}>
          <MaterialIcons name="attach-money" size={24} color="#fff" />
          <Text style={styles.modalTitle}>Chi tiết mệnh giá</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Ionicons name="close-circle" size={32} color="#fff" />
        </TouchableOpacity>
      </BlurView>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.detailScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.detailHeader}>
          <View style={styles.valueContainer}>
            <Text style={styles.moneyValue}>{moneyInfo.value} VNĐ</Text>
          </View>
          <Image source={moneyInfo.image} style={styles.moneyImage} />
        </View>

        <View style={styles.descriptionSection}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="description" size={24} color="#2196F3" />
            <Text style={styles.sectionTitle}>Đặc điểm nhận dạng</Text>
          </View>
          <View style={styles.descriptionBox}>
            <View style={styles.descriptionItem}>
              <MaterialIcons name="flip-camera-android" size={20} color="#666" style={{ marginTop: 10, marginRight: 5 }} />
              <Text style={styles.descriptionLabel}>Mặt trước:</Text>
            </View>
            <Text style={styles.descriptionText}>{moneyInfo.frontDescription}</Text>
            <View style={[styles.descriptionItem, styles.marginTop]}>
              <MaterialIcons name="flip-camera-android" size={20} color="#666" style={{ marginTop: 10, marginRight: 5 }} />
              <Text style={styles.descriptionLabel}>Mặt sau:</Text>
            </View>
            <Text style={styles.descriptionText}>{moneyInfo.backDescription}</Text>
          </View>
        </View>

        <View style={styles.specSection}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="info" size={24} color="#2196F3" />
            <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
          </View>
          <View style={styles.specContainer}>
            <View style={[styles.specBox, styles.specBoxTL]}>
              <MaterialIcons name="straighten" size={20} color="#666" />
              <Text style={styles.specLabel}>Kích thước</Text>
              <Text style={styles.specValue}>{moneyInfo.size}</Text>
              <View style={[styles.cornerLine, styles.cornerLineTL]} />
              <View style={[styles.cornerLine, styles.cornerLineTL2]} />
              <View style={styles.bottomLine} />
            </View>

            <View style={[styles.specBox, styles.specBoxTR]}>
              <MaterialIcons name="color-lens" size={20} color="#666" />
              <Text style={styles.specLabel}>Màu sắc</Text>
              <Text style={styles.specValue}>{moneyInfo.color}</Text>
              <View style={[styles.cornerLine, styles.cornerLineTR]} />
              <View style={[styles.cornerLine, styles.cornerLineTR2]} />
              <View style={styles.bottomLine} />
            </View>

            <View style={[styles.specBox, styles.specBoxBL]}>
              <MaterialIcons name="event" size={20} color="#666" />
              <Text style={styles.specLabel}>Năm phát hành</Text>
              <Text style={styles.specValue}>{moneyInfo.year}</Text>
              <View style={[styles.cornerLine, styles.cornerLineBL]} />
              <View style={[styles.cornerLine, styles.cornerLineBL2]} />
              <View style={styles.bottomLine} />
            </View>

            <View style={[styles.specBox, styles.specBoxBR]}>
              <MaterialIcons name="layers" size={20} color="#666" />
              <Text style={styles.specLabel}>Chất liệu</Text>
              <Text style={styles.specValue}>{moneyInfo.material}</Text>
              <View style={[styles.cornerLine, styles.cornerLineBR]} />
              <View style={[styles.cornerLine, styles.cornerLineBR2]} />
              <View style={styles.bottomLine} />
            </View>
          </View>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="shield" size={24} color="#2196F3" />
            <Text style={styles.sectionTitle}>Đặc điểm bảo an</Text>
          </View>
          <View style={styles.featuresList}>
            {moneyInfo.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.standardSection}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="check-circle" size={24} color="#2196F3" />
            <Text style={styles.sectionTitle}>Đặc điểm chung</Text>
          </View>
          <View style={styles.featuresList}>
            {moneyInfo.standardFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  detailScroll: {
    flex: 1,
    padding: 20,
  },
  detailHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  moneyValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 15,
  },
  moneyImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  // sectionTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: '#333',
  //   marginBottom: 10,
  // },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#333',
    marginTop: 5,
    lineHeight: 22,
  },
  specSection: {
    marginBottom: 20,
  },
  specContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  specBox: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 2,
  },
  specBoxTL: {
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  specBoxTR: {
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  specBoxBL: {
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  specBoxBR: {
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  specLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  specValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: 20,
  },
  standardSection: {
    marginBottom: 30,
  },
  featuresList: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginLeft: 10,
  },
  descriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  marginTop: {
    marginTop: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cornerLine: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  cornerLineTL: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerLineTR: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerLineBL: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerLineBR: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  cornerLineTL2: {
    top: 4,
    left: 4,
    width: 12,
    height: 12,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerLineTR2: {
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerLineBL2: {
    bottom: 4,
    left: 4,
    width: 12,
    height: 12,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerLineBR2: {
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottomLine: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#2196F3',
    opacity: 0.5,
  },
}); 