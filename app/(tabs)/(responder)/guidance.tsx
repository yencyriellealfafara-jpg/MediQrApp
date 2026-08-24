import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = ['First Aid', 'CPR', 'Allergies', 'Medications'];

export default function ResponderGuidance() {
  const [activeCategory, setActiveCategory] = useState('First Aid');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Guidance</Text>
        <Text style={styles.headerSub}>Interactive educational medical guidelines</Text>
      </View>

      {/* Category Filter Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsContainer}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <Pressable
              key={cat}
              style={[styles.pill, isActive && styles.activePill]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.pillText, isActive && styles.activePillText]}>{cat}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Guideline Card 1: Anaphylaxis */}
      <View style={styles.guidelineCard}>
        <View style={styles.cardHeader}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Anaphylaxis Emergency Response</Text>
            <Text style={styles.cardSub}>
              Step-by-step protocol for administering EpiPen auto-injector and maintaining patient airway.
            </Text>
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={12} color="#0284c7" />
              <Text style={styles.timeText}>3 min read</Text>
            </View>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150' }}
            style={styles.cardImage}
          />
        </View>
      </View>

      {/* Guideline Card 2: CPR */}
      <View style={styles.guidelineCard}>
        <View style={styles.cardHeader}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Cardiopulmonary Resuscitation</Text>
            <Text style={styles.cardSub}>
              Standard adult CPR: chest compressions depth metrics, rate, and rescue breathing instructions.
            </Text>
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={12} color="#0284c7" />
              <Text style={styles.timeText}>5 min read</Text>
            </View>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=150' }}
            style={styles.cardImage}
          />
        </View>
      </View>

      {/* Guideline Card 3: Major Bleeding */}
      <View style={styles.guidelineCard}>
        <View style={styles.cardHeader}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Major Bleeding Control</Text>
            <Text style={styles.cardSub}>
              How to properly apply direct pressure and utilize tactical emergency tourniquets safely.
            </Text>
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={12} color="#0284c7" />
              <Text style={styles.timeText}>4 min read</Text>
            </View>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=150' }}
            style={styles.cardImage}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingBottom: 40 },
  header: { marginTop: 10, marginBottom: 16 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  headerSub: { fontSize: 13, color: '#64748b', marginTop: 2 },
  pillsContainer: { flexGrow: 0, marginBottom: 20 },
  pill: { backgroundColor: '#e2e8f0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  activePill: { backgroundColor: '#0284c7' },
  pillText: { fontSize: 13, fontWeight: '500', color: '#475569' },
  activePillText: { color: '#fff', fontWeight: '600' },
  guidelineCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 12 },
  cardHeader: { flexDirection: 'row', gap: 12 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  cardSub: { fontSize: 11, color: '#64748b', marginTop: 4, lineHeight: 16 },
  timeBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 },
  timeText: { fontSize: 11, color: '#0284c7', fontWeight: '500' },
  cardImage: { width: 70, height: 70, borderRadius: 8 },
});