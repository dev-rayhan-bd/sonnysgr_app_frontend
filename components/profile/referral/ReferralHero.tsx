import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface ReferralHeroProps {
  onBack: () => void
}

const ReferralHero: React.FC<ReferralHeroProps> = ({ onBack }) => (
  <View style={styles.container}>
    {/* Back button */}
    <TouchableOpacity
      onPress={onBack}
      style={styles.backBtn}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Feather name="chevron-left" size={22} color="#fff" />
    </TouchableOpacity>

    {/* Icon */}
    <View style={styles.iconWrapper}>
      <Text style={styles.iconEmoji}>🌿</Text>
    </View>

    {/* Text */}
    <Text style={styles.title}>Invite friends.{'\n'}Earn rewards.</Text>
    <Text style={styles.subtitle}>
      Get $10 GoSNKR credit for every friend{'\n'}who signs up and makes their first purchase.
    </Text>
  </View>
)

export default ReferralHero

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    paddingTop: 56,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 56,
    left: 16,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
})