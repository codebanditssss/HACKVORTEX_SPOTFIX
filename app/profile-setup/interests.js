import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

export default function Interests() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/profile-setup/verification');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interests Setup</Text>
      <CustomButton
        title="Continue"
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