// components/profilesetup/LocationPrivacyNote.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function LocationPrivacyNote() {
  return (
    <View style={styles.container}>
      <View style={styles.iconRing}>
        <View style={styles.iconDot} />
      </View>
      <Text style={styles.text}>
        Your location stays private. Used only to find nearby stores.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 10,
  },
  iconRing: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  text: {
    flex: 1,
    fontSize: 13,
    color: '#166534',
    lineHeight: 19,
    fontWeight: '500',
  },
})