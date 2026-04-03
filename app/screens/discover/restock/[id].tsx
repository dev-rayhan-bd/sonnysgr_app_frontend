// ─────────────────────────────────────────────────────────────────────────────
// app/notifications/restock/[id].tsx
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import RestockAlertScreen from '../reStockAlertScreen'

export default function RestockAlertRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return <RestockAlertScreen notificationId={id} />
}


