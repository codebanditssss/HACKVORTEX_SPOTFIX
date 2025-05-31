import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

export default function PersonalInfo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    ageGroup: '',
    contactNumber: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    gender: '',
    ageGroup: '',
    contactNumber: '',
  });

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

  const handlePhoneNumberChange = (text) => {
    // Remove any non-digit characters except the initial +91
    const cleaned = text.replace(/[^\d]/g, '');
    
    // Limit to 10 digits after +91
    if (cleaned.length <= 10) {
      setFormData({ ...formData, contactNumber: cleaned });
      setErrors({ ...errors, contactNumber: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {
      fullName: '',
      gender: '',
      ageGroup: '',
      contactNumber: '',
    };
    let isValid = true;

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    // Validate gender selection
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
      isValid = false;
    }

    // Validate age group selection
    if (!formData.ageGroup) {
      newErrors.ageGroup = 'Please select your age group';
      isValid = false;
    }

    // Validate phone number
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
      isValid = false;
    } else if (formData.contactNumber.length !== 10) {
      newErrors.contactNumber = 'Please enter a valid 10-digit number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push('/(profile-setup)/location');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={[styles.progressCircle, styles.activeCircle]}>
              <Text style={styles.progressText}>1</Text>
            </View>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>2</Text>
            </View>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>3</Text>
            </View>
          </View>
          <View style={styles.progressLine} />
        </View>

        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.subtitle}>Tell us about yourself</Text>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.fullName}
              onChangeText={(text) => {
                setFormData({ ...formData, fullName: text });
                setErrors({ ...errors, fullName: '' });
              }}
            />
          </View>
          {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.optionsContainer}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  formData.gender === option && styles.optionButtonActive,
                ]}
                onPress={() => {
                  setFormData({ ...formData, gender: option });
                  setErrors({ ...errors, gender: '' });
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    formData.gender === option && styles.optionTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age Group</Text>
          <View style={styles.optionsContainer}>
            {ageGroups.map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.optionButton,
                  formData.ageGroup === age && styles.optionButtonActive,
                ]}
                onPress={() => {
                  setFormData({ ...formData, ageGroup: age });
                  setErrors({ ...errors, ageGroup: '' });
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    formData.ageGroup === age && styles.optionTextActive,
                  ]}
                >
                  {age}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.ageGroup ? <Text style={styles.errorText}>{errors.ageGroup}</Text> : null}
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
            <Text style={styles.phonePrefix}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              keyboardType="phone-pad"
              value={formData.contactNumber}
              onChangeText={handlePhoneNumberChange}
              maxLength={10}
            />
          </View>
          {errors.contactNumber ? <Text style={styles.errorText}>{errors.contactNumber}</Text> : null}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
          />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
    paddingHorizontal: SPACING.md,
    height: 56,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  phonePrefix: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginRight: SPACING.sm,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.small,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    margin: SPACING.xs,
  },
  optionButtonActive: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
  },
  optionTextActive: {
    color: COLORS.white,
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
  }
}); 