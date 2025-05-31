import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

// Indian states and districts data
const INDIA_STATES = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  // Add more states and their districts...
};

export default function Location() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    ward: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({
    state: '',
    district: '',
    ward: '',
    pincode: '',
  });

  const states = Object.keys(INDIA_STATES);
  const districts = formData.state ? INDIA_STATES[formData.state] : [];

  const validateForm = () => {
    let newErrors = {
      state: '',
      district: '',
      ward: '',
      pincode: '',
    };
    let isValid = true;

    if (!formData.state) {
      newErrors.state = 'Please select your state';
      isValid = false;
    }

    if (!formData.district) {
      newErrors.district = 'Please select your district';
      isValid = false;
    }

    if (!formData.ward.trim()) {
      newErrors.ward = 'Please enter your ward/municipality';
      isValid = false;
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Please enter your pincode';
      isValid = false;
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push('/profile-setup/interests');
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
            <View style={[styles.progressCircle, styles.activeCircle]}>
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

        <Text style={styles.title}>Where Are You Located?</Text>
        <Text style={styles.subtitle}>Help us serve your community better</Text>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>State</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.state}
              onValueChange={(value) => {
                setFormData({ ...formData, state: value, district: '' });
                setErrors({ ...errors, state: '' });
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select your state" value="" />
              {states.map((state) => (
                <Picker.Item key={state} label={state} value={state} />
              ))}
            </Picker>
          </View>
          {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>District</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.district}
              onValueChange={(value) => {
                setFormData({ ...formData, district: value });
                setErrors({ ...errors, district: '' });
              }}
              style={styles.picker}
              enabled={!!formData.state}
            >
              <Picker.Item label="Select your district" value="" />
              {districts.map((district) => (
                <Picker.Item key={district} label={district} value={district} />
              ))}
            </Picker>
          </View>
          {errors.district ? <Text style={styles.errorText}>{errors.district}</Text> : null}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Ward/Municipality</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your ward or municipality"
              value={formData.ward}
              onChangeText={(text) => {
                setFormData({ ...formData, ward: text });
                setErrors({ ...errors, ward: '' });
              }}
            />
          </View>
          {errors.ward ? <Text style={styles.errorText}>{errors.ward}</Text> : null}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Pincode</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={24} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit pincode"
              keyboardType="numeric"
              maxLength={6}
              value={formData.pincode}
              onChangeText={(text) => {
                setFormData({ ...formData, pincode: text });
                setErrors({ ...errors, pincode: '' });
              }}
            />
          </View>
          {errors.pincode ? <Text style={styles.errorText}>{errors.pincode}</Text> : null}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Continue"
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
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
    marginBottom: SPACING.xs,
  },
  picker: {
    height: 56,
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
  input: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.black,
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
  }
}); 