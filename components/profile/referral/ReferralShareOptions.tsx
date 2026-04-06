import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import type { ShareOption } from '@/types/referral'

interface ReferralShareOptionsProps {
  options: ShareOption[]
  onSelect: (id: string) => void
  copied: boolean
}

const ReferralShareOptions: React.FC<ReferralShareOptionsProps> = ({
  options,
  onSelect,
  copied,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>Share your link:</Text>

    <View style={styles.list}>
      {options.map((opt, idx) => {
        const isLast = idx === options.length - 1
        const isCopyLink = opt.id === 'copy'

        return (
          <TouchableOpacity
            key={opt.id}
            onPress={() => onSelect(opt.id)}
            style={[styles.row, !isLast && styles.rowBorder]}
            activeOpacity={0.7}
          >
            {/* Left icon */}
            <View style={styles.iconWrapper}>
              <Feather name={opt.icon as any} size={18} color="#9CA3AF" />
            </View>

            <Text style={styles.rowLabel}>{opt.label}</Text>

            {/* Right: copy badge or chevron */}
            {isCopyLink ? (
              <View style={[styles.copyBadge, copied && styles.copyBadgeSuccess]}>
                <Text style={[styles.copyBadgeText, copied && styles.copyBadgeTextSuccess]}>
                  {copied ? 'Copied' : 'Copy'}
                </Text>
              </View>
            ) : (
              <Feather name="chevron-right" size={16} color="#374151" />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  </View>
)

export default ReferralShareOptions

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 10,
  },
  list: {
    backgroundColor: '#111827',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#D1D5DB',
  },
  copyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#1F2937',
  },
  copyBadgeSuccess: {
    backgroundColor: '#14532D',
  },
  copyBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  copyBadgeTextSuccess: {
    color: '#22C55E',
  },
})