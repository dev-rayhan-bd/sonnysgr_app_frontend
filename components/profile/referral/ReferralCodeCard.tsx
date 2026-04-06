import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface ReferralCodeCardProps {
  code: string
  copied: boolean
  onCopy: () => void
}

const ReferralCodeCard: React.FC<ReferralCodeCardProps> = ({ code, copied, onCopy }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>YOUR REFERRAL CODE</Text>

    <TouchableOpacity onPress={onCopy} activeOpacity={0.8} style={styles.codeCard}>
      <Text style={styles.code}>{code}</Text>
      <View style={styles.copyRow}>
        <Feather name={copied ? 'check' : 'copy'} size={12} color={copied ? '#22C55E' : '#6B7280'} />
        <Text style={[styles.copyText, copied && styles.copyTextSuccess]}>
          {copied ? 'Copied!' : 'Tap to copy'}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
)

export default ReferralCodeCard

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#22C55E',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  codeCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  code: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 3,
    marginBottom: 8,
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  copyText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  copyTextSuccess: {
    color: '#22C55E',
  },
})