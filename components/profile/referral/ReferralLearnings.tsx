import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { ReferralEntry, ReferralStats } from '@/types/referral'

interface ReferralEarningsProps {
  stats: ReferralStats
  entries: ReferralEntry[]
}

const ReferralEarnings: React.FC<ReferralEarningsProps> = ({ stats, entries }) => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>Your Earnings</Text>

    {/* Earnings card */}
    <View style={styles.earningsCard}>
      <Text style={styles.earningsAmount}>${stats.totalEarned}</Text>
      <Text style={styles.earningsLabel}>{stats.successfulReferrals} successful referrals</Text>
    </View>

    {/* Entry list */}
    <View style={styles.entryList}>
      {entries.map((entry, idx) => {
        const isLast = idx === entries.length - 1
        const isEarned = entry.status === 'earned'

        return (
          <View key={entry.id} style={[styles.entryRow, !isLast && styles.entryBorder]}>
            {/* Avatar */}
            <View style={[styles.avatar, { backgroundColor: entry.avatarColor }]}>
              <Text style={styles.avatarText}>{entry.initials}</Text>
            </View>

            {/* Info */}
            <View style={styles.entryInfo}>
              <Text style={styles.entryName}>{entry.name}</Text>
              <Text style={styles.entryDate}>{entry.date}</Text>
            </View>

            {/* Status badge */}
            <View style={[styles.statusBadge, isEarned ? styles.statusEarned : styles.statusPending]}>
              <Text style={[styles.statusText, isEarned ? styles.statusTextEarned : styles.statusTextPending]}>
                {isEarned ? `$${entry.amount} earned` : 'Pending'}
              </Text>
            </View>
          </View>
        )
      })}
    </View>

    {/* Processing note */}
    {stats.processingAmount >= 0 && (
      <Text style={styles.processingNote}>
        Processing earnings: ${stats.processingAmount} — waiting for your friend's first purchase
      </Text>
    )}

    {/* Terms */}
    <Text style={styles.terms}>Terms & conditions apply</Text>
  </View>
)

export default ReferralEarnings

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F9FAFB',
    marginBottom: 12,
  },
  earningsCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  earningsAmount: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  earningsLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 4,
  },
  entryList: {
    backgroundColor: '#111827',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
    marginBottom: 12,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  entryBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
  },
  entryInfo: {
    flex: 1,
  },
  entryName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E5E7EB',
  },
  entryDate: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusEarned: {
    backgroundColor: '#14532D',
  },
  statusPending: {
    backgroundColor: '#1F2937',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextEarned: {
    color: '#22C55E',
  },
  statusTextPending: {
    color: '#9CA3AF',
  },
  processingNote: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 12,
  },
  terms: {
    fontSize: 11,
    color: '#4B5563',
    textAlign: 'center',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
})