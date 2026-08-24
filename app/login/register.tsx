import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { generateSecurePlatformId } from '../../utils/security';

export default function RegisterScreen() {
  const router = useRouter();

  // Name Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mi, setMi] = useState('');

  // Account Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Health Metrics
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [birthday, setBirthday] = useState('');

  // Emergency Contact
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  // Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Your passwords do not match. Please try again.');
      return;
    }

    // Generate secure, unique, and non-reversible Platform ID
    const securePlatformId = await generateSecurePlatformId(email);

    const fullName = `${firstName} ${mi ? mi + '. ' : ''}${lastName}`;
    const emergencyContactStr = contactName && contactNumber ? `${contactName} • ${contactNumber}` : 'Not Specified';

    const userData = {
      fullName,
      email,
      birthday: birthday || 'Not Specified',
      bloodType: bloodType || 'Not Specified',
      allergies: allergies || 'None',
      emergencyContact: emergencyContactStr,
      platformId: securePlatformId,
    };

    try {
      await AsyncStorage.setItem('@mediqr_user', JSON.stringify(userData));
      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert('Storage Error', 'Failed to save registration data.');
    }
  };

  const handleFinish = () => {
    setShowSuccessModal(false);
    router.replace('/login/citizen');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Create MediQR Account</Text>
      <Text style={styles.headerSub}>Enter your information to generate your Emergency Health ID</Text>

      {/* Row 1: First Name, Last Name, M.I */}
      <View style={styles.row}>
        <View style={[styles.fieldGroup, { flex: 2 }]}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#94a3b8"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={[styles.fieldGroup, { flex: 2 }]}>
          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#94a3b8"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.label}>M.I.</Text>
          <TextInput
            style={styles.input}
            placeholder="M.I"
            placeholderTextColor="#94a3b8"
            maxLength={2}
            value={mi}
            onChangeText={setMi}
          />
        </View>
      </View>

      {/* Row 2: Email Address */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="name@example.com"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Row 3: Password */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Row 4: Confirm Password */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Confirm Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Row 5: Blood Type & Known Allergies */}
      <View style={styles.row}>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.label}>Blood Type</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. O Positive (O+)"
            placeholderTextColor="#94a3b8"
            value={bloodType}
            onChangeText={setBloodType}
          />
        </View>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.label}>Known Allergies</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Penicillin, Peanuts"
            placeholderTextColor="#94a3b8"
            value={allergies}
            onChangeText={setAllergies}
          />
        </View>
      </View>

      {/* Row 6: Birthday */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Birthday</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/DD/YYYY"
          placeholderTextColor="#94a3b8"
          value={birthday}
          onChangeText={setBirthday}
        />
      </View>

      {/* Emergency Contact Header */}
      <Text style={styles.sectionHeader}>Emergency Contact</Text>

      {/* Row 7: Contact Name & Contact Number */}
      <View style={styles.row}>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.label}>Contact Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Jane Doe (Spouse)"
            placeholderTextColor="#94a3b8"
            value={contactName}
            onChangeText={setContactName}
          />
        </View>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 (555) 019-2834"
            placeholderTextColor="#94a3b8"
            keyboardType="phone-pad"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
        </View>
      </View>

      {/* Register Action Button */}
      <Pressable style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerBtnText}>Register Account</Text>
      </Pressable>

      {/* Back to Login Button */}
      <Pressable 
        style={styles.backBtn}
        onPress={() => router.push('/login/citizen')}
      >
        <Text style={styles.backBtnText}>
          Already have an account? <Text style={styles.backBtnBold}>Log In</Text>
        </Text>
      </Pressable>

      {/* Registration Success Modal Popup */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons name="checkmark-circle" size={64} color="#22c55e" style={styles.icon} />
            <Text style={styles.modalTitle}>Registration Complete</Text>
            <Text style={styles.modalMessage}>
              Your MediQR account and Emergency Health ID have been successfully created.
            </Text>
            <Pressable style={styles.finishBtn} onPress={handleFinish}>
              <Text style={styles.finishBtnText}>Finish</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingTop: 40, paddingBottom: 40 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  headerSub: { fontSize: 13, color: '#64748b', marginTop: 4, marginBottom: 20 },
  row: { flexDirection: 'row', gap: 10 },
  fieldGroup: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: '600', color: '#475569', marginBottom: 5 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, paddingHorizontal: 12, height: 42, fontSize: 14, color: '#0f172a' },
  sectionHeader: { fontSize: 15, fontWeight: '700', color: '#0f172a', marginTop: 8, marginBottom: 12 },
  registerBtn: { backgroundColor: '#0284c7', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  registerBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  backBtn: { marginTop: 16, alignItems: 'center', paddingVertical: 8 },
  backBtnText: { color: '#64748b', fontSize: 13 },
  backBtnBold: { color: '#0284c7', fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { backgroundColor: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 360, alignItems: 'center', elevation: 5 },
  icon: { marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a', textAlign: 'center' },
  modalMessage: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 6, marginBottom: 20, lineHeight: 18 },
  finishBtn: { backgroundColor: '#0284c7', width: '100%', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  finishBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});