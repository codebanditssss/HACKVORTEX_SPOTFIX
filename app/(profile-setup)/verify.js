import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

export default function Verify() {
  const router = useRouter();
  const [aadhaar, setAadhaar] = useState('');
  const [error, setError] = useState('');

  const validateAadhaar = (number) => {
    // Basic Aadhaar validation - 12 digits
    return /^\d{12}$/.test(number);
  };

  const formatAadhaarDisplay = (number) => {
    if (!number) return 'XXXX-XXXX-1234';
    // Format as XXXX-XXXX-1234
    return number.replace(/(\d{4})/g, '$1-').slice(0, -1);
  };

  const handleAadhaarChange = (text) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 12) {
      setAadhaar(cleaned);
      setError('');
    }
  };

  const handleContinue = async () => {
    if (!aadhaar) {
      try {
        const personalInfo = await AsyncStorage.getItem('personalInfo');
        const locationInfo = await AsyncStorage.getItem('locationInfo');
        
        if (personalInfo && locationInfo) {
          const userData = {
            ...JSON.parse(personalInfo),
            location: JSON.parse(locationInfo)
          };
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
        }
        
        router.push('/home');
      } catch (error) {
        console.error('Error saving user data:', error);
      }
      return;
    }

    if (!validateAadhaar(aadhaar)) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    try {
      const personalInfo = await AsyncStorage.getItem('personalInfo');
      const locationInfo = await AsyncStorage.getItem('locationInfo');
      
      if (personalInfo && locationInfo) {
        const userData = {
          ...JSON.parse(personalInfo),
          location: JSON.parse(locationInfo),
          aadhaar: aadhaar
        };
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      }
      
      router.push('/home');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={[styles.progressCircle, styles.completedCircle]}>
              <Ionicons name="checkmark" size={24} color={COLORS.white} />
            </View>
          </View>
          <View style={styles.progressItem}>
            <View style={[styles.progressCircle, styles.completedCircle]}>
              <Ionicons name="checkmark" size={24} color={COLORS.white} />
            </View>
          </View>
          <View style={styles.progressItem}>
            <View style={[styles.progressCircle, styles.activeCircle]}>
              <Text style={styles.progressText}>3</Text>
            </View>
          </View>
          <View style={styles.progressLine} />
        </View>

        <Text style={styles.title}>Verify Your Identity</Text>
        <Text style={styles.subtitle}>Optional step to unlock more features</Text>

        <View style={styles.formSection}>
          <View style={styles.aadhaarCard}>
            <Ionicons name="card-outline" size={24} color={COLORS.white} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Enter Aadhaar</Text>
            <Text style={styles.cardSubtitle}>Manually enter your Aadhaar number</Text>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="card-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter 12-digit Aadhaar number"
              keyboardType="numeric"
              value={aadhaar}
              onChangeText={handleAadhaarChange}
              maxLength={12}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.maskedContainer}>
            <Ionicons name="card" size={20} color={COLORS.gray} />
            <Text style={styles.maskedText}>{formatAadhaarDisplay(aadhaar)}</Text>
          </View>

          <View style={styles.secureContainer}>
            <Ionicons name="lock-closed" size={16} color={COLORS.gray} />
            <Text style={styles.secureText}>Your Aadhaar number is masked and securely stored</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Complete Setup"
            onPress={handleContinue}
            style={styles.continueButton}
          />
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: SPACING.xl,
    paddingTop: SPACING.xxl * 2,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    position: 'relative',
  },
  progressItem: {
    alignItems: 'center',
    zIndex: 1,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.xl,
  },
  activeCircle: {
    backgroundColor: COLORS.primary,
  },
  completedCircle: {
    backgroundColor: COLORS.primary,
  },
  progressText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  progressLine: {
    position: 'absolute',
    top: '50%',
    left: '15%',
    right: '15%',
    height: 2,
    backgroundColor: '#E0E0E0',
    zIndex: 0,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: SPACING.xl,
  },
  formSection: {
    marginBottom: SPACING.xl,
  },
  aadhaarCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  cardIcon: {
    marginBottom: SPACING.md,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  cardSubtitle: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
    paddingHorizontal: SPACING.md,
    height: 56,
    marginBottom: SPACING.sm,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  maskedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  maskedText: {
    marginLeft: SPACING.sm,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: 'monospace',
  },
  secureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  secureText: {
    marginLeft: SPACING.sm,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  errorText: {
    color: 'red',
    fontSize: SIZES.small,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  buttonContainer: {
    marginTop: SPACING.xxl,
  },
  continueButton: {
    marginBottom: SPACING.lg,
  },
  backButton: {
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontWeight: '500',
  },
}); 