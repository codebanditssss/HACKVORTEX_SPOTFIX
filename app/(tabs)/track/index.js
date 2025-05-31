import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SPACING } from '../../../constants/theme';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
];

export default function Track() {
  const [complaints, setComplaints] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

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

  const getFilteredComplaints = () => {
    if (activeFilter === 'all') return complaints;
    return complaints.filter(
      complaint => complaint.status.toLowerCase().replace(' ', '_') === activeFilter
    );
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return '#4CAF50';
      case 'in progress':
        return '#FFC107';
      default:
        return '#F44336';
    }
  };

  const renderComplaint = ({ item }) => (
    <TouchableOpacity style={styles.complaintCard}>
      <View style={styles.complaintHeader}>
        <Text style={styles.complaintTitle}>{item.category}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.complaintFooter}>
        <Text style={styles.dateText}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        {item.location && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color={COLORS.gray} />
            <Text style={styles.locationText}>View on Map</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Complaints</Text>
      </View>

      <View style={styles.filterContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.activeFilter,
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getFilteredComplaints()}
        renderItem={renderComplaint}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-outline" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>No complaints found</Text>
          </View>
        }
      />
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
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.small,
    marginRight: SPACING.sm,
    backgroundColor: '#F5F5F5',
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  activeFilterText: {
    color: COLORS.white,
    fontWeight: '500',
  },
  listContainer: {
    padding: SPACING.lg,
  },
  complaintCard: {
    backgroundColor: '#F5F5F5',
    padding: SPACING.lg,
    borderRadius: SIZES.small,
    marginBottom: SPACING.md,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  complaintTitle: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.small,
  },
  statusText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '500',
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: SPACING.md,
  },
  complaintFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: SPACING.md,
  },
}); 