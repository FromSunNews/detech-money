import { StyleSheet, Platform, StatusBar } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import MoneyDetection from '@/app/money-detection';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <MoneyDetection style={styles.moneyDetection} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  moneyDetection: {
    flex: 1,
    width: '100%',
  }
});
