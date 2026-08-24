// app/login/_layout.tsx
import { Stack } from 'expo-router';

export default function LoginLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="citizen" />
      <Stack.Screen name="responder" />
    </Stack>
  );
}