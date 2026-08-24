import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

export default function ProfileScreen() {
  const patientId = 'MED-8947-QR';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }}
          style={styles.avatar}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.userName}>Sarah Jenkins</Text>
          <Text style={styles.platformId}>Platform ID: {patientId}</Text>
        </View>
      </View>

      {/* Emergency Health ID QR Card */}
      <View style={styles.qrCard}>
        <View style={styles.qrContainer}>
          <QRCode value={patientId} size={160} color="#0284c7" backgroundColor="white" />
        </View>
        <Text style={styles.qrLabel}>EMERGENCY HEALTH ID</Text>
      </View>

      {/* Vital Health Metrics */}
      <Text style={styles.sectionTitle}>Vital Health Metrics</Text>
      <View style={styles.metricsGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Blood Type</Text>
          <Text style={styles.metricValue}>O Positive (O+)</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Allergies</Text>
          <Text style={[styles.metricValue, { color: '#ef4444' }]}>Penicillin</Text>
        </View>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.metricLabel}>Emergency Contact</Text>
        <Text style={styles.contactValue}>Robert Jenkins (Spouse) • +1 (555) 019-2834</Text>
      </View>

      {/* Medical Records Vault */}
      <View style={styles.vaultHeader}>
        <Text style={styles.sectionTitle}>Medical Records Vault</Text>
        <Pressable>
          <Ionicons name="add-circle-outline" size={22} color="#0284c7" />
        </Pressable>
      </View>

      <View style={styles.documentCard}>
        <Ionicons name="document-text-outline" size={24} color="#64748b" />
        <View style={styles.documentInfo}>
          <Text style={styles.documentName}>Immunization_Record.pdf</Text>
          <Text style={styles.documentMeta}>1.4 MB • Oct 10, 2025</Text>
        </View>
        <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
      </View>

      {/* Download Button */}
      <Pressable style={styles.downloadBtn}>
        <Ionicons name="download-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.downloadBtnText}>Download MediQR ID</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 14 },
  headerTextContainer: { justifyContent: 'center' },
  userName: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  platformId: { fontSize: 12, color: '#64748b', marginTop: 2 },
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
  vaultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  documentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 20 },
  documentInfo: { flex: 1, marginLeft: 12 },
  documentName: { fontSize: 13, fontWeight: '600', color: '#0f172a' },
  documentMeta: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  downloadBtn: { backgroundColor: '#0284c7', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 12 },
  downloadBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});