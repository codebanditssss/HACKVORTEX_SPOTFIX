import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

// Indian states and districts data
const INDIA_STATES = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "West Godavari"],
  "Arunachal Pradesh": ["Tawang", "Papum Pare", "East Siang", "West Siang", "Lower Subansiri", "Upper Subansiri", "Changlang", "Lohit", "Dibang Valley", "Kurung Kumey"],
  "Assam": ["Kamrup", "Dibrugarh", "Nagaon", "Tinsukia", "Cachar", "Barpeta", "Sonitpur", "Karimganj", "Golaghat", "Lakhimpur"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Samastipur", "Saran", "Nalanda", "Rohtas"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Rajnandgaon", "Janjgir-Champa", "Raigarh", "Bastar", "Kanker", "Surguja"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Kutch", "Gandhinagar", "Patan"],
  "Haryana": ["Gurugram", "Faridabad", "Ambala", "Hisar", "Karnal", "Panipat", "Rohtak", "Sonipat", "Yamunanagar", "Bhiwani"],
  "Himachal Pradesh": ["Shimla", "Kangra", "Mandi", "Solan", "Bilaspur", "Hamirpur", "Chamba", "Kullu", "Una", "Sirmaur"],
  "Jharkhand": ["Ranchi", "Dhanbad", "Jamshedpur (East Singhbhum)", "Bokaro", "Hazaribagh", "Giridih", "Deoghar", "Palamu", "Dumka", "Godda"],
  "Karnataka": ["Bengaluru Urban", "Mysuru", "Davanagere", "Belagavi", "Kalaburagi", "Mangaluru (Dakshina Kannada)", "Hubballi-Dharwad (Dharwad)", "Ballari", "Tumakuru", "Shivamogga"],
  "Kerala": ["Thiruvananthapuram", "Kochi (Ernakulam)", "Kozhikode", "Thrissur", "Alappuzha", "Palakkad", "Kollam", "Kottayam", "Malappuram", "Kannur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Rewa", "Satna", "Ratlam", "Chhindwara"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Sangli"],
  "Manipur": ["Imphal West", "Imphal East", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul", "Senapati", "Tamenglong", "Kangpokpi", "Chandel"],
  "Meghalaya": ["East Khasi Hills", "West Khasi Hills", "Ri-Bhoi", "West Garo Hills", "East Garo Hills", "South Garo Hills", "South West Garo Hills", "North Garo Hills", "South West Khasi Hills", "Eastern West Khasi Hills"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Mamit", "Saiha", "Hnahthial", "Khawzawl"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Mon", "Phek", "Wokha", "Zunheboto", "Kiphire", "Longleng"],
  "Odisha": ["Bhubaneswar (Khordha)", "Cuttack", "Puri", "Sambalpur", "Balasore", "Berhampur (Ganjam)", "Rourkela (Sundargarh)", "Angul", "Jajpur", "Mayurbhanj"],
  "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Mohali (SAS Nagar)", "Hoshiarpur", "Gurdaspur", "Firozpur", "Sangrur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Alwar", "Bhilwara", "Sikar", "Barmer"],
  "Sikkim": ["Gangtok (East Sikkim)", "Gyalshing (West Sikkim)", "Namchi (South Sikkim)", "Mangan (North Sikkim)"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Thanjavur", "Vellore", "Erode", "Dindigul"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Adilabad", "Rangareddy", "Mahbubnagar", "Medak", "Nalgonda"],
  "Tripura": ["Agartala (West Tripura)", "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti"],
  "Uttar Pradesh": ["Lucknow", "Kanpur Nagar", "Varanasi", "Agra", "Ghaziabad", "Allahabad (Prayagraj)", "Bareilly", "Meerut", "Gorakhpur", "Moradabad"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Udham Singh Nagar", "Almora", "Pauri Garhwal", "Tehri Garhwal", "Chamoli", "Bageshwar", "Champawat"],
  "West Bengal": ["Kolkata", "Howrah", "Hooghly", "North 24 Parganas", "South 24 Parganas", "Nadia", "Burdwan", "Darjeeling", "Jalpaiguri", "Murshidabad"],
  // Union Territories
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Dadra and Nagar Haveli"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Kupwara", "Pulwama", "Kathua", "Doda", "Rajouri"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Lakshadweep"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
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

  const handleContinue = async () => {
    if (validateForm()) {
      try {
        await AsyncStorage.setItem('locationInfo', JSON.stringify(formData));
        router.push('/(profile-setup)/verify');
      } catch (error) {
        console.error('Error saving location info:', error);
      }
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