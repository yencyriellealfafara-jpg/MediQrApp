import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

// Admin Bypass Credentials for Responder Platform
const RESPONDER_ADMIN_EMAIL = 'responder.admin@mediqr.gov.ph';
const RESPONDER_ADMIN_PASS = 'ResponderPass2026!';

export default function ResponderLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleResponderLogin = () => {
    // 1. Admin Bypass Check
    if (email.trim().toLowerCase() === RESPONDER_ADMIN_EMAIL && password === RESPONDER_ADMIN_PASS) {
      router.replace('/(tabs)/(responder)');
      return;
    }

    // 2. Standard Input Validation
    if (!email || !password) {
      Alert.alert('Missing Credentials', 'Please enter your responder email and password.');
      return;
    }

    // Default Responder Access
    router.replace('/(tabs)/(responder)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brandTitle}>MediQR Responder</Text>
      <Text style={styles.subtitle}>First Responder Portal</Text>

      {/* Segmented Toggle Control */}
      <View style={styles.toggleContainer}>
        <Pressable 
          style={styles.toggleBtn}
          onPress={() => router.push('/login/citizen')}
        >
          <Text style={styles.inactiveToggleText}>Login as Citizen</Text>
        </Pressable>
        <Pressable style={[styles.toggleBtn, styles.activeToggle]}>
          <Text style={styles.activeToggleText}>Login as Responder</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Official Responder Email</Text>
      <TextInput 
        style={styles.input} 
        placeholder="responder@agency.gov.ph" 
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
        onPress={handleResponderLogin}
      >
        <Text style={styles.btnText}>Login as Responder</Text>
      </Pressable>

      <Pressable onPress={() => {}}>
        <Text style={styles.linkText}>Request Credentials / Support</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f8fafc' },
  brandTitle: { fontSize: 28, fontWeight: '800', textAlign: 'center', color: '#0f172a' },
  subtitle: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginTop: 4, marginBottom: 16, color: '#0284c7' },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#e2e8f0', borderRadius: 8, padding: 4, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  activeToggle: { backgroundColor: '#0284c7' },
  activeToggleText: { color: '#ffffff', fontWeight: '600' },
  inactiveToggleText: { color: '#64748b', fontWeight: '500' },
  label: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 6 },
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14, color: '#0f172a' },
  primaryBtn: { backgroundColor: '#0284c7', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#ffffff', fontWeight: '600', fontSize: 15 },
  linkText: { color: '#0284c7', textAlign: 'center', marginTop: 18, fontSize: 13, fontWeight: '500' },
});