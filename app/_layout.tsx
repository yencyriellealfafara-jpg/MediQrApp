/*
  What: Root layout for the app's navigation stack.
  Which: Declares top-level screens (index, login flow, and the (tabs) group).
  Why: Provides a single place to configure navigation behaviour (here headerShown:false) and register routes.
  How: Uses expo-router's Stack to declare screens that match the file-system based routing.
*/
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}