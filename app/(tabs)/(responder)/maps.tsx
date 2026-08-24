import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ResponderHub() {
  const router = useRouter();
  const [isOnDuty, setIsOnDuty] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Banner / Duty Toggle */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Responder Dispatch</Text>
          <Text style={styles.headerSub}>Unit #402 • Emergency Medical Services</Text>
        </View>
        <View style={styles.dutyContainer}>
          <Text style={[styles.dutyStatus, { color: isOnDuty ? '#22c55e' : '#94a3b8' }]}>
            {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
          </Text>
          <Switch
            value={isOnDuty}
            onValueChange={setIsOnDuty}
            trackColor={{ false: '#cbd5e1', true: '#0284c7' }}
          />
        </View>
      </View>

      {/* Dispatch Map Placeholder Card */}
      <View style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <Ionicons name="navigate-circle-outline" size={20} color="#0284c7" />
          <Text style={styles.mapTitle}>Active Dispatch Zone</Text>
        </View>
        <View style={styles.mapMock}>
          <Ionicons name="location" size={32} color="#ef4444" />
          <Text style={styles.mapMockText}>Map Preview • Sector 4 Central</Text>
        </View>
      </View>

      {/* Active Incident Emergency Alert Card */}
      <Text style={styles.sectionTitle}>Active Emergency Dispatch</Text>
      
      <View style={styles.incidentCard}>
        <View style={styles.alertHeader}>
          <View style={styles.priorityBadge}>
            <Text style={styles.priorityText}>HIGH PRIORITY</Text>
          </View>
          <Text style={styles.timestamp}>2 mins ago</Text>
        </View>

        <Text style={styles.incidentTitle}>Vehicle Collision / Trauma</Text>
        <Text style={styles.incidentAddress}>Corner 5th Ave & 12th St, Downtown</Text>

        <View style={styles.patientInfo}>
          <Ionicons name="person-circle-outline" size={18} color="#64748b" />
          <Text style={styles.patientText}>Citizen ID Linked • QR Available</Text>
        </View>

        <View style={styles.actionRow}>
          <Pressable 
            style={styles.scanPatientBtn}
            onPress={() => router.push('/modal' as any)}
          >
            <Ionicons name="qr-code-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.scanPatientText}>Scan Patient QR</Text>
          </Pressable>

          <Pressable style={styles.routeBtn}>
            <Ionicons name="navigate-outline" size={16} color="#0284c7" style={{ marginRight: 6 }} />
            <Text style={styles.routeBtnText}>Start Route</Text>
          </Pressable>
        </View>
      </View>

      {/* Dispatch Hotline Quick Contacts */}
      <Text style={styles.sectionTitle}>Station Direct Lines</Text>
      
      <View style={styles.contactCard}>
        <Ionicons name="call-outline" size={20} color="#0284c7" />
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>Central Dispatch HQ</Text>
          <Text style={styles.contactSub}>Frequency 142.85 MHz</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  headerSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  dutyContainer: { alignItems: 'flex-end' },
  dutyStatus: { fontSize: 10, fontWeight: '700', marginBottom: 2 },
  mapCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 20 },
  mapHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  mapTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  mapMock: { height: 130, backgroundColor: '#e2e8f0', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  mapMockText: { fontSize: 12, color: '#64748b', fontWeight: '500', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  incidentCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#fee2e2', marginBottom: 20 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  priorityBadge: { backgroundColor: '#fee2e2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  priorityText: { fontSize: 10, fontWeight: '700', color: '#ef4444' },
  timestamp: { fontSize: 11, color: '#94a3b8' },
  incidentTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  incidentAddress: { fontSize: 12, color: '#64748b', marginTop: 2 },
  patientInfo: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, marginBottom: 16 },
  patientText: { fontSize: 12, color: '#64748b' },
  actionRow: { flexDirection: 'row', gap: 10 },
  scanPatientBtn: { flex: 1, backgroundColor: '#0284c7', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 8 },
  scanPatientText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  routeBtn: { flex: 1, backgroundColor: '#e0f2fe', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 8 },
  routeBtnText: { color: '#0284c7', fontWeight: '600', fontSize: 13 },
  contactCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', gap: 12 },
  contactDetails: { flex: 1 },
  contactName: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  contactSub: { fontSize: 11, color: '#94a3b8', marginTop: 1 },
});