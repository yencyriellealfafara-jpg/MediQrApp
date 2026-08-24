import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Citizen Tab Section */}
      <Tabs.Screen
        name="(citizen)"
        options={{
          title: 'Citizen',
        }}
      />

      {/* Responder Tab Section */}
      <Tabs.Screen
        name="(responder)"
        options={{
          title: 'Responder',
        }}
      />

      {/* Hide login route from the bottom tab bar */}
      <Tabs.Screen
        name="login"
        options={{
          href: null, // Completely removes the tab button from the bottom bar
          tabBarStyle: { display: 'none' }, // Hides the tab bar container when on login
        }}
      />
    </Tabs>
  );
}