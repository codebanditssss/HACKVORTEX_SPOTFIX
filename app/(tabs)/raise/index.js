import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SPACING } from '../../../constants/theme';

const categories = [
  { id: 'road', name: 'Road Damage', icon: 'construct' },
  { id: 'garbage', name: 'Garbage', icon: 'trash' },
  { id: 'water', name: 'Waterlogging', icon: 'water' },
  { id: 'lights', name: 'Broken Lights', icon: 'bulb' },
  { id: 'manhole', name: 'Open Manhole', icon: 'warning' },
  { id: 'safety', name: 'Public Safety', icon: 'shield' },
];

const urgencyLevels = [
  { id: 'low', name: 'Low', color: '#4CAF50' },
  { id: 'medium', name: 'Medium', color: '#FFC107' },
  { id: 'high', name: 'High', color: '#F44336' },
];

export default function RaiseComplaint() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: 3,
      });

      if (!result.canceled) {
        setImages([...images, ...result.assets]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !description || !selectedUrgency) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const complaint = {
        category: selectedCategory,
        description,
        urgency: selectedUrgency,
        isAnonymous,
        images: images.map(img => img.uri),
        location,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      // Get existing complaints or initialize empty array
      const existingComplaints = await AsyncStorage.getItem('complaints');
      const complaints = existingComplaints ? JSON.parse(existingComplaints) : [];

      // Add new complaint
      complaints.push(complaint);

      // Save updated complaints
      await AsyncStorage.setItem('complaints', JSON.stringify(complaints));

      Alert.alert(
        'Success',
        'Your complaint has been submitted successfully',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setSelectedCategory(null);
              setDescription('');
              setSelectedUrgency(null);
              setIsAnonymous(false);
              setImages([]);
              setLocation(null);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit complaint');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Raise a Complaint</Text>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons
                  name={category.icon}
                  size={24}
                  color={selectedCategory === category.id ? COLORS.white : COLORS.primary}
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Describe the issue in detail..."
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              maxLength={500}
            />
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>
        </View>

        {/* Image Upload */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Photos/Videos</Text>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
              <Ionicons name="camera-outline" size={32} color={COLORS.gray} />
              <Text style={styles.addImageText}>Add Media</Text>
            </TouchableOpacity>
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={styles.imagePreview}
              />
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Ionicons name="location-outline" size={24} color={COLORS.primary} />
            <Text style={styles.locationText}>Use Current Location</Text>
          </TouchableOpacity>
        </View>

        {/* Urgency Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Urgency Level</Text>
          <View style={styles.urgencyContainer}>
            {urgencyLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.urgencyButton,
                  selectedUrgency === level.id && { backgroundColor: level.color },
                ]}
                onPress={() => setSelectedUrgency(level.id)}
              >
                <Text
                  style={[
                    styles.urgencyText,
                    selectedUrgency === level.id && styles.selectedUrgencyText,
                  ]}
                >
                  {level.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Anonymous Toggle */}
        <TouchableOpacity
          style={styles.anonymousContainer}
          onPress={() => setIsAnonymous(!isAnonymous)}
        >
          <Ionicons
            name={isAnonymous ? 'checkbox' : 'square-outline'}
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.anonymousText}>Submit Anonymously</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Complaint</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  categoryItem: {
    width: '31%',
    aspectRatio: 1,
    margin: '1%',
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: SIZES.small,
    color: COLORS.black,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
    padding: SPACING.md,
  },
  descriptionInput: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    alignSelf: 'flex-end',
    marginTop: SPACING.xs,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  addImageButton: {
    width: 100,
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.gray,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: SIZES.small,
  },
  addImageText: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: SPACING.xs,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: SPACING.md,
    borderRadius: SIZES.small,
  },
  locationText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  urgencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urgencyButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: SPACING.md,
    borderRadius: SIZES.small,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
  },
  urgencyText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  selectedUrgencyText: {
    color: COLORS.white,
  },
  anonymousContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  anonymousText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: SPACING.sm,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: SIZES.small,
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  submitButtonText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.white,
  },
}); 