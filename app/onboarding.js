import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { COLORS, SIZES, SPACING } from '../constants/theme';

export default function Onboarding() {
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      // Clear any existing data to ensure a fresh start
      await AsyncStorage.clear();
      // Set onboarding flag
      await AsyncStorage.setItem('hasOnboarded', 'true');
      router.push('/sign-up');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const handleLogin = async () => {
    try {
      // Clear any existing data to ensure a fresh start
      await AsyncStorage.clear();
      // Set onboarding flag
      await AsyncStorage.setItem('hasOnboarded', 'true');
      router.push('/sign-in');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Fix What Matters,{'\n'}Right Where It Matters.
          </Text>
          <Text style={styles.subtitle}>
            Join the movement to report, track, and resolve local issues in your community.
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <CustomButton
            title="Create Account"
            onPress={handleGetStarted}
            style={styles.mainButton}
          />
          
          <TouchableOpacity 
            onPress={handleLogin}
            style={styles.loginContainer}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'space-between',
    paddingVertical: SPACING.xxl * 2,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: SPACING.xxl,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: SIZES.xxLarge * 1.3,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
    lineHeight: SIZES.large,
  },
  actionContainer: {
    width: '100%',
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  loginText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  loginLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
}); 