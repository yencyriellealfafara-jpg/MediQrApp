import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyHotlines() {
  const triggerCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Banner */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>EMERGENCY HOTLINES & INFO</Text>
        <Text style={styles.headerTitle}>Direct Assistance</Text>
      </View>

      {/* User Quick Info Summary Badge */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Blood Type</Text>
          <Text style={styles.summaryValue}>O Positive (O+)</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Known Allergies</Text>
          <Text style={[styles.summaryValue, { color: '#ef4444' }]}>Penicillin</Text>
        </View>
      </View>

      {/* Hotline List */}
      <Text style={styles.sectionTitle}>Emergency Contacts</Text>

      {/* Police Emergency */}
      <View style={styles.hotlineCard}>
        <View style={[styles.iconBox, { backgroundColor: '#e0f2fe' }]}>
          <Ionicons name="shield-checkmark" size={22} color="#0284c7" />
        </View>
        <View style={styles.hotlineDetails}>
          <Text style={styles.hotlineTitle}>Police Info</Text>
          <Text style={styles.hotlineSub}>National Hotline • 911</Text>
        </View>
        <Pressable 
          style={[styles.callBtn, { backgroundColor: '#0284c7' }]}
          onPress={() => triggerCall('911')}
        >
          <Ionicons name="call" size={16} color="#fff" />
        </Pressable>
      </View>

      {/* Firefighter Emergency */}
      <View style={styles.hotlineCard}>
        <View style={[styles.iconBox, { backgroundColor: '#ffedd5' }]}>
          <Ionicons name="flame" size={22} color="#f97316" />
        </View>
        <View style={styles.hotlineDetails}>
          <Text style={styles.hotlineTitle}>Firefighter Info</Text>
          <Text style={styles.hotlineSub}>Central Station • 160</Text>
        </View>
        <Pressable 
          style={[styles.callBtn, { backgroundColor: '#f97316' }]}
          onPress={() => triggerCall('160')}
        >
          <Ionicons name="call" size={16} color="#fff" />
        </Pressable>
      </View>

      {/* Medical & BANTAY Emergency */}
      <View style={styles.hotlineCard}>
        <View style={[styles.iconBox, { backgroundColor: '#fee2e2' }]}>
          <Ionicons name="medical" size={22} color="#ef4444" />
        </View>
        <View style={styles.hotlineDetails}>
          <Text style={styles.hotlineTitle}>Bantay Bata Info</Text>
          <Text style={styles.hotlineSub}>Child Protection • 163</Text>
        </View>
        <Pressable 
          style={[styles.callBtn, { backgroundColor: '#ef4444' }]}
          onPress={() => triggerCall('163')}
        >
          <Ionicons name="call" size={16} color="#fff" />
        </Pressable>
      </View>

      {/* Mental Health Support */}
      <View style={styles.hotlineCard}>
        <View style={[styles.iconBox, { backgroundColor: '#f3e8ff' }]}>
          <Ionicons name="heart" size={22} color="#a855f7" />
        </View>
        <View style={styles.hotlineDetails}>
          <Text style={styles.hotlineTitle}>Mental Health Info</Text>
          <Text style={styles.hotlineSub}>Crisis Line • 1553</Text>
        </View>
        <Pressable 
          style={[styles.callBtn, { backgroundColor: '#a855f7' }]}
          onPress={() => triggerCall('1553')}
        >
          <Ionicons name="call" size={16} color="#fff" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingBottom: 40 },
  header: { marginTop: 10, marginBottom: 16 },
  headerSub: { fontSize: 11, fontWeight: '700', color: '#64748b', letterSpacing: 0.5 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#0f172a', marginTop: 2 },
  summaryCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 24, alignItems: 'center' },
  summaryItem: { flex: 1 },
  summaryLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },
  summaryValue: { fontSize: 14, fontWeight: '700', color: '#0f172a', marginTop: 2 },
  divider: { width: 1, height: '100%', backgroundColor: '#f1f5f9', marginHorizontal: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  hotlineCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 12 },
  iconBox: { width: 42, height: 42, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  hotlineDetails: { flex: 1 },
  hotlineTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  hotlineSub: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  callBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
});