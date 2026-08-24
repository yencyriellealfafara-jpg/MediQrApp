import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

// Place credentials at the top outside the component
const ADMIN_EMAIL = 'admin@mediqr.com';
const ADMIN_PASS = 'admin123';

export default function CitizenLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 1. Admin Bypass Check
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASS) {
      router.replace('/(tabs)/(citizen)');
      return;
    }

    // 2. Regular Validation
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    // Default Login
    router.replace('/(tabs)/(citizen)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brandTitle}>MediQR</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>

      {/* Segmented Toggle Control */}
      <View style={styles.toggleContainer}>
        <Pressable style={[styles.toggleBtn, styles.activeToggle]}>
          <Text style={styles.activeToggleText}>Login as Citizen</Text>
        </Pressable>
        <Pressable 
          style={styles.toggleBtn} 
          onPress={() => router.push('/login/responder')}
        >
          <Text style={styles.inactiveToggleText}>Login as Responder</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Email Address</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter your email" 
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput 
        style={styles.input} 
        secureTextEntry 
        placeholder="Enter your password" 
        value={password}
        onChangeText={setPassword}
      />

      <Pressable 
        style={styles.primaryBtn} 
        onPress={handleLogin}
      >
        <Text style={styles.btnText}>Login</Text>
      </Pressable>

      <Pressable onPress={() => {}}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </Pressable>

      <Pressable 
        style={styles.registerLinkContainer}
        onPress={() => router.push('/login/register')}
      >
        <Text style={styles.registerSubText}>
          Don't have an account? <Text style={styles.registerBoldText}>Register Here</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f9fafb' },
  brandTitle: { fontSize: 28, fontWeight: '700', textAlign: 'center', color: '#000' },
  subtitle: { fontSize: 20, fontWeight: '600', textAlign: 'center', marginVertical: 12, color: '#333' },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#e5e7eb', borderRadius: 8, padding: 4, marginVertical: 16 },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  activeToggle: { backgroundColor: '#0284c7' },
  activeToggleText: { color: '#fff', fontWeight: '600' },
  inactiveToggleText: { color: '#4b5563', fontWeight: '500' },
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 },
  input: { backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, marginBottom: 16 },
  primaryBtn: { backgroundColor: '#0284c7', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  linkText: { color: '#0284c7', textAlign: 'center', marginTop: 16, fontSize: 14 },
  registerLinkContainer: { marginTop: 20 },
  registerSubText: { color: '#374151', textAlign: 'center', fontSize: 13 },
  registerBoldText: { color: '#0284c7', fontWeight: '600' },
});