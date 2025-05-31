import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SPACING } from '../../../constants/theme';

export default function Nearby() {
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const storedComplaints = await AsyncStorage.getItem('complaints');
      if (storedComplaints) {
        setComplaints(JSON.parse(storedComplaints));
      }
    } catch (error) {
      console.error('Error loading complaints:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Issues</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'map' && styles.activeToggle,
            ]}
            onPress={() => setViewMode('map')}
          >
            <Ionicons
              name="map"
              size={20}
              color={viewMode === 'map' ? COLORS.white : COLORS.gray}
            />
            <Text
              style={[
                styles.toggleText,
                viewMode === 'map' && styles.activeToggleText,
              ]}
            >
              Map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'list' && styles.activeToggle,
            ]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons
              name="list"
              size={20}
              color={viewMode === 'list' ? COLORS.white : COLORS.gray}
            />
            <Text
              style={[
                styles.toggleText,
                viewMode === 'list' && styles.activeToggleText,
              ]}
            >
              List
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={48} color={COLORS.gray} />
          <Text style={styles.placeholderText}>
            Map integration coming soon!
          </Text>
          <Text style={styles.placeholderSubtext}>
            We're working on integrating maps to show nearby issues.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
    padding: SPACING.xs,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.small,
    flex: 1,
    justifyContent: 'center',
  },
  activeToggle: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
  },
  activeToggleText: {
    color: COLORS.white,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
    padding: SPACING.xl,
  },
  placeholderText: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.gray,
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
}); 