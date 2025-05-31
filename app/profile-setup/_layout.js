import { Stack } from 'expo-router';

export default function ProfileSetupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="location" />
      <Stack.Screen name="interests" />
      <Stack.Screen name="verification" />
    </Stack>
  );
} 