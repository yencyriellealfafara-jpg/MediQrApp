import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Modal, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';

export default function CitizenProfile() {
  const router = useRouter();
  const [user, setUser] = useState<{
    fullName: string;
    platformId: string;
    bloodType: string;
    allergies: string;
    emergencyContact: string;
  } | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Automatically refresh user data whenever user tabs to Profile screen
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@mediqr_user');
      if (storedData) {
        setUser(JSON.parse(storedData));
      }
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  const handlePressIn = () => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    holdTimer.current = setTimeout(async () => {
      try {
        await AsyncStorage.removeItem('@mediqr_user');
        setShowDeleteModal(false);
        router.replace('/login/citizen');
      } catch (error) {
        Alert.alert('Error', 'Failed to delete profile data.');
      }
    }, 5000);
  };

  const handlePressOut = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.noDataText}>No profile found. Please log in or register.</Text>
        <Pressable style={styles.downloadBtn} onPress={() => router.replace('/login/citizen')}>
          <Text style={styles.downloadBtnText}>Go to Login</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }}
          style={styles.avatar}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.platformId}>Platform ID: {user.platformId}</Text>
        </View>
      </View>

      {/* Emergency Health ID QR Card */}
      <View style={styles.qrCard}>
        <View style={styles.qrContainer}>
          <QRCode value={user.platformId} size={160} color="#0284c7" backgroundColor="white" />
        </View>
        <Text style={styles.qrLabel}>EMERGENCY HEALTH ID</Text>
      </View>

      {/* Vital Health Metrics */}
      <Text style={styles.sectionTitle}>Vital Health Metrics</Text>
      <View style={styles.metricsGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Blood Type</Text>
          <Text style={styles.metricValue}>{user.bloodType}</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Allergies</Text>
          <Text style={[styles.metricValue, { color: '#ef4444' }]}>{user.allergies}</Text>
        </View>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.metricLabel}>Emergency Contact</Text>
        <Text style={styles.contactValue}>{user.emergencyContact}</Text>
      </View>

      {/* Download Action Button */}
      <Pressable style={styles.downloadBtn}>
        <Ionicons name="download-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.downloadBtnText}>Download MediQR ID</Text>
      </Pressable>

      {/* Delete Profile Action Button */}
      <Pressable style={styles.deleteBtn} onPress={() => setShowDeleteModal(true)}>
        <Ionicons name="trash-outline" size={18} color="#ef4444" style={{ marginRight: 6 }} />
        <Text style={styles.deleteBtnText}>Delete Profile</Text>
      </Pressable>

      {/* Confirmation Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons name="warning-outline" size={48} color="#ef4444" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Delete Profile?</Text>
            <Text style={styles.modalMessage}>
              This action is permanent. Press and hold the button for 5 seconds to clear your profile.
            </Text>

            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.holdDeleteBtn}
            >
              <Animated.View
                style={[
                  styles.progressOverlay,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
              <Text style={styles.holdDeleteBtnText}>Hold 5s to Delete</Text>
            </Pressable>

            <Pressable
              style={styles.cancelBtn}
              onPress={() => {
                setShowDeleteModal(false);
                handlePressOut();
              }}
            >
              <Text style={styles.cancelBtnText}>No, Keep Profile</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  centered: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  noDataText: { fontSize: 14, color: '#64748b', marginBottom: 16, textAlign: 'center' },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 14 },
  headerTextContainer: { justifyContent: 'center', flex: 1 },
  userName: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  platformId: { fontSize: 11, color: '#64748b', marginTop: 2 },
  qrCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 24 },
  qrContainer: { padding: 12, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  qrLabel: { fontSize: 11, fontWeight: '700', color: '#0284c7', letterSpacing: 1, marginTop: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  metricsGrid: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  metricBox: { flex: 1, backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9' },
  metricLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },
  metricValue: { fontSize: 14, fontWeight: '700', color: '#0f172a', marginTop: 4 },
  contactBox: { backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 24 },
  contactValue: { fontSize: 13, fontWeight: '600', color: '#0f172a', marginTop: 4 },
  downloadBtn: { backgroundColor: '#0284c7', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12 },
  downloadBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  deleteBtn: { marginTop: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#fecaca', backgroundColor: '#fef2f2' },
  deleteBtnText: { color: '#ef4444', fontWeight: '600', fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '100%', maxWidth: 360, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  modalMessage: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 6, marginBottom: 20, lineHeight: 18 },
  holdDeleteBtn: { width: '100%', height: 48, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#ef4444', borderRadius: 8, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' },
  progressOverlay: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: '#ef4444' },
  holdDeleteBtnText: { color: '#0f172a', fontWeight: '700', fontSize: 14, zIndex: 1 },
  cancelBtn: { marginTop: 12, paddingVertical: 10, width: '100%', alignItems: 'center' },
  cancelBtnText: { color: '#64748b', fontWeight: '600', fontSize: 13 },
});