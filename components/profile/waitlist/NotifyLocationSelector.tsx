// components/profile/waitlist/NotifyLocationSelector.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NotifyLocation } from '@/services/hooks/profile/useJoinWaitlist'

interface NotifyLocationSelectorProps {
  selected: NotifyLocation
  onSelect: (loc: NotifyLocation) => void
  onChooseStores: () => void
}

export const NotifyLocationSelector: React.FC<NotifyLocationSelectorProps> = ({
  selected,
  onSelect,
  onChooseStores,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notify me when available at:</Text>
      <View style={styles.options}>
        {/* Anywhere nearby */}
        <TouchableOpacity
          style={[styles.option, selected === 'anywhere' && styles.optionSelected]}
          onPress={() => onSelect('anywhere')}
          activeOpacity={0.8}
        >
          <Text style={styles.optionIcon}>📍</Text>
          {selected === 'anywhere' && (
            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          )}
          <Text style={[styles.optionTitle, selected === 'anywhere' && styles.optionTitleSelected]}>
            Anywhere nearby
          </Text>
          <Text style={styles.optionSub}>Within 10 miles</Text>
        </TouchableOpacity>

        {/* Specific stores */}
        <TouchableOpacity
          style={[styles.option, selected === 'specific' && styles.optionSelected]}
          onPress={() => onSelect('specific')}
          activeOpacity={0.8}
        >
          <Text style={styles.optionIcon}>🏪</Text>
          <Text style={[styles.optionTitle, selected === 'specific' && styles.optionTitleSelected]}>
            Specific stores only
          </Text>
          <TouchableOpacity onPress={onChooseStores}>
            <Text style={styles.chooseStores}>Choose stores →</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    gap: 4,
  },
  optionSelected: {
    borderColor: '#22c55e',
    backgroundColor: '#f0fdf4',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  optionIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  optionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  optionTitleSelected: {
    color: '#166534',
  },
  optionSub: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
  chooseStores: {
    fontSize: 11,
    color: '#22c55e',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
})