import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../constants/theme';

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    fullName: '',
    location: {
      state: '',
      district: '',
      ward: '',
    },
  });
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const recentComplaints = [
    {
      id: '1',
      title: 'Street Light Not Working',
      status: 'In Progress',
      date: '2024-03-15',
    },
    {
      id: '2',
      title: 'Garbage Collection Issue',
      status: 'Pending',
      date: '2024-03-14',
    },
  ];

  const nearbyIssues = [
    {
      id: '1',
      title: 'Road Maintenance Required',
      distance: '0.5 km',
      status: 'Open',
    },
    {
      id: '2',
      title: 'Water Supply Disruption',
      distance: '1.2 km',
      status: 'In Progress',
    },
  ];

  const suggestions = [
    'Report a pothole',
    'Street light issues',
    'Garbage collection',
    'Water supply problems',
  ];

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  const renderComplaintCard = ({ item }) => (
    <TouchableOpacity style={styles.complaintCard}>
      <View style={styles.complaintHeader}>
        <Text style={styles.complaintTitle}>{item.title}</Text>
        <Text style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'In Progress' ? '#FFB74D' : '#EF5350' }
        ]}>
          {item.status}
        </Text>
      </View>
      <Text style={styles.complaintDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  const renderNearbyIssue = ({ item }) => (
    <TouchableOpacity style={styles.nearbyCard}>
      <Text style={styles.nearbyTitle}>{item.title}</Text>
      <View style={styles.nearbyFooter}>
        <Text style={styles.nearbyDistance}>{item.distance}</Text>
        <Text style={styles.nearbyStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hi {getFirstName(userData.fullName)}!</Text>
          <View style={styles.location}>
            <Ionicons name="location-outline" size={16} color={COLORS.gray} />
            <Text style={styles.locationText}>
              {userData.location.ward}, {userData.location.district}
            </Text>
            <TouchableOpacity>
              <Ionicons name="pencil" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
            {notifications > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{notifications}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Raise Complaint Button */}
        <TouchableOpacity style={styles.raiseComplaintButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.white} />
          <Text style={styles.raiseComplaintText}>Raise a Complaint</Text>
        </TouchableOpacity>

        {/* Track My Complaints */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Track My Complaints</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentComplaints}
            renderItem={renderComplaintCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Nearby Issues */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Issues</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View Map</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={nearbyIssues}
            renderItem={renderNearbyIssue}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggestions for You</Text>
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity key={index} style={styles.suggestionChip}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="home" size={24} color={COLORS.primary} />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.gray} />
          <Text style={styles.navText}>Raise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="location-outline" size={24} color={COLORS.gray} />
          <Text style={styles.navText}>Track</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map-outline" size={24} color={COLORS.gray} />
          <Text style={styles.navText}>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color={COLORS.gray} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl * 2,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  locationText: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginHorizontal: SPACING.xs,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    marginRight: SPACING.md,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  profileButton: {
    marginLeft: SPACING.sm,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  raiseComplaintButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    borderRadius: SIZES.small,
    marginBottom: SPACING.xl,
  },
  raiseComplaintText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  viewAllButton: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
  },
  complaintCard: {
    backgroundColor: '#F8F8F8',
    padding: SPACING.lg,
    borderRadius: SIZES.small,
    marginRight: SPACING.md,
    width: 250,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  complaintTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
    marginRight: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.small,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  complaintDate: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  nearbyCard: {
    backgroundColor: '#F8F8F8',
    padding: SPACING.lg,
    borderRadius: SIZES.small,
    marginRight: SPACING.md,
    width: 200,
  },
  nearbyTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  nearbyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nearbyDistance: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  nearbyStatus: {
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
  },
  suggestionChip: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  suggestionText: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    color: COLORS.primary,
  },
  navText: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: SPACING.xs,
  },
  activeNavText: {
    color: COLORS.primary,
  },
}); 