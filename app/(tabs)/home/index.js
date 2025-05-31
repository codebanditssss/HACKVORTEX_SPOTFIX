import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SPACING } from '../../../constants/theme';

const stats = {
  totalComplaints: 156,
  resolvedIssues: 89,
  activeIssues: 67,
  communityRank: 'Silver',
};

const recentComplaints = [
  {
    id: '1',
    title: 'Road Damage on Main Street',
    status: 'In Progress',
    date: '2 hours ago',
    category: 'road',
  },
  {
    id: '2',
    title: 'Garbage Collection Delayed',
    status: 'Pending',
    date: '5 hours ago',
    category: 'garbage',
  },
  {
    id: '3',
    title: 'Street Light Not Working',
    status: 'Resolved',
    date: '1 day ago',
    category: 'lights',
  },
];

export default function Home() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return '#4CAF50';
      case 'In Progress':
        return '#FFC107';
      default:
        return '#F44336';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'road':
        return 'construct';
      case 'garbage':
        return 'trash';
      case 'lights':
        return 'bulb';
      default:
        return 'alert-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.subtitle}>Let's make our community better</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsNumber}>{stats.totalComplaints}</Text>
            <Text style={styles.statsLabel}>Total Complaints</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsNumber}>{stats.resolvedIssues}</Text>
            <Text style={styles.statsLabel}>Resolved</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsNumber}>{stats.activeIssues}</Text>
            <Text style={styles.statsLabel}>Active</Text>
          </View>
        </View>

        {/* Community Rank */}
        <View style={styles.rankCard}>
          <View style={styles.rankHeader}>
            <Text style={styles.rankTitle}>Community Rank</Text>
            <View style={styles.rankBadge}>
              <Ionicons name="trophy" size={20} color="#FFD700" />
              <Text style={styles.rankText}>{stats.communityRank}</Text>
            </View>
          </View>
          <Text style={styles.rankDescription}>
            Keep reporting issues to maintain your rank and unlock more features!
          </Text>
        </View>

        {/* Recent Complaints */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Complaints</Text>
          {recentComplaints.map((complaint) => (
            <TouchableOpacity key={complaint.id} style={styles.complaintCard}>
              <View style={styles.complaintHeader}>
                <View style={styles.categoryIcon}>
                  <Ionicons
                    name={getCategoryIcon(complaint.category)}
                    size={20}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.complaintTitle}>{complaint.title}</Text>
              </View>
              <View style={styles.complaintFooter}>
                <Text style={styles.dateText}>{complaint.date}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(complaint.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{complaint.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    flex: 1,
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  welcomeText: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: SPACING.xs,
  },
  notificationButton: {
    padding: SPACING.sm,
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.small,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: SPACING.lg,
    borderRadius: SIZES.small,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statsLabel: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  rankCard: {
    backgroundColor: '#F5F5F5',
    padding: SPACING.lg,
    borderRadius: SIZES.small,
    marginBottom: SPACING.xl,
  },
  rankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  rankTitle: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.black,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.small,
  },
  rankText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    marginLeft: SPACING.xs,
  },
  rankDescription: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  recentSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
  complaintCard: {
    backgroundColor: '#F5F5F5',
    padding: SPACING.lg,
    borderRadius: SIZES.small,
    marginBottom: SPACING.md,
  },
  complaintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryIcon: {
    backgroundColor: '#E0E0E0',
    padding: SPACING.sm,
    borderRadius: SIZES.small,
    marginRight: SPACING.sm,
  },
  complaintTitle: {
    flex: 1,
    fontSize: SIZES.medium,
    fontWeight: '500',
    color: COLORS.black,
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
}); 