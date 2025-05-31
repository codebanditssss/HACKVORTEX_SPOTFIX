import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

export default function Verification() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the main app after verification
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Setup</Text>
      <CustomButton
        title="Complete Setup"
        onPress={handleContinue}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.xl,
  },
  button: {
    width: '100%',
  },
}); 