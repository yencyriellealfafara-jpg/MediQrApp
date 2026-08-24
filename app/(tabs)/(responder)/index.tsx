import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ResponderHome() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingSub}>WELCOME BACK</Text>
          <Text style={styles.userName}>Sarah Jenkins</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }}
          style={styles.avatar}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search medical guidelines, records..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Primary Scanner Button */}
      <Pressable 
        style={styles.scanButton}
        onPress={() => router.push('/modal' as any)}
      >
        <Ionicons name="qr-code-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.scanButtonText}>Scan Health QR Code</Text>
      </Pressable>

      {/* Quick Action Cards */}
      <View style={styles.grid}>
        <Pressable 
          style={styles.card}
          onPress={() => router.push('/(tabs)/(responder)/mpas' as any)}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#e0f2fe' }]}>
            <Ionicons name="document-text-outline" size={20} color="#0284c7" />
          </View>
          <Text style={styles.cardTitle}>My Records</Text>
          <Text style={styles.cardSub}>0 uploaded documents</Text>
        </Pressable>

        <Pressable 
          style={styles.card}
          onPress={() => router.push('/(tabs)/(responder)/mpas' as any)}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#fee2e2' }]}>
            <Ionicons name="medical-outline" size={20} color="#ef4444" />
          </View>
          <Text style={styles.cardTitle}>Emergency Info</Text>
          <Text style={styles.cardSub}>Blood group, allergies</Text>
        </Pressable>
      </View>

      {/* Recent QR Scans */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent QR Scans</Text>
        <Pressable><Text style={styles.seeAll}>See All</Text></Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <View style={styles.scanCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300' }}
            style={styles.scanCardImage}
          />
          <View style={styles.scanCardContent}>
            <Text style={styles.scanCardTitle}>Metro Health West</Text>
            <Text style={styles.scanCardSub}>Checked In • Today, 10:30 AM</Text>
          </View>
        </View>

        <View style={styles.scanCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300' }}
            style={styles.scanCardImage}
          />
          <View style={styles.scanCardContent}>
            <Text style={styles.scanCardTitle}>Apex Diagnostics</Text>
            <Text style={styles.scanCardSub}>Lab Scan • Oct 24, 2025</Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 16 },
  greetingSub: { fontSize: 11, fontWeight: '700', color: '#64748b', letterSpacing: 0.5 },
  userName: { fontSize: 22, fontWeight: '700', color: '#0f172a', marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', paddingHorizontal: 12, marginBottom: 16 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 44, fontSize: 14, color: '#0f172a' },
  scanButton: { backgroundColor: '#0284c7', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 12, marginBottom: 16 },
  scanButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  grid: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  card: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9' },
  iconContainer: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  cardSub: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  seeAll: { fontSize: 12, color: '#0284c7', fontWeight: '600' },
  horizontalScroll: { flexGrow: 0 },
  scanCard: { width: 200, backgroundColor: '#fff', borderRadius: 12, marginRight: 12, borderWidth: 1, borderColor: '#f1f5f9', overflow: 'hidden' },
  scanCardImage: { width: '100%', height: 100 },
  scanCardContent: { padding: 10 },
  scanCardTitle: { fontSize: 13, fontWeight: '600', color: '#0f172a' },
  scanCardSub: { fontSize: 10, color: '#94a3b8', marginTop: 2 },
});