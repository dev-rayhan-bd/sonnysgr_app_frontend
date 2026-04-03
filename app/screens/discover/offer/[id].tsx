 
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import OfferFromStoreScreen from '../offerFromStoreScreen'
 
export default function OfferFromStoreRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return <OfferFromStoreScreen notificationId={id} />
}
 