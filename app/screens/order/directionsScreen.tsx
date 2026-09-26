// app/screens/order/directionsScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { useDirections } from '@/services/hooks/order/useDirections'
import DirectionStepRow from '@/components/profile/orders/DirectionStepRow'
import Button from '@/components/shared/Button'
import BaseContainer from '@/components/shared/BaseContainer'

export default function DirectionsScreen() {
  const router = useRouter()
  const { directions, mapRegion, openInMaps, shareLocation } = useDirections()

  return (
    <BaseContainer scrollable backgroundColor='#fff'>
      <View className='pt-10'>
      {/* Nav */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 text-base font-bold text-gray-900 text-center">Directions</Text>
        <TouchableOpacity onPress={shareLocation} className="p-1">
          <Feather name="share" size={18} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* In-app map with route */}
        <View className="mx-4 mt-4 rounded-2xl overflow-hidden border border-gray-100" style={{ height: 220 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={mapRegion}
            showsUserLocation
            showsMyLocationButton={false}
            showsCompass={false}
            scrollEnabled
            zoomEnabled
          >
            <Marker coordinate={directions.origin} pinColor="#3B82F6" title="You" />
            <Marker coordinate={directions.destination} pinColor="#22C55E" title={directions.storeName} />

            <Polyline
              coordinates={directions.routeCoordinates}
              strokeColor="#22C55E"
              strokeWidth={4}
            />
          </MapView>
        </View>

        {/* Store + ETA */}
        <View className="mx-4 mt-4 bg-green-50 border border-green-100 rounded-2xl px-4 py-4">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-10 h-10 rounded-xl bg-green-500 items-center justify-center">
              <Text className="text-white text-xs font-extrabold">SK</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900">{directions.storeName}</Text>
              <Text className="text-xs text-gray-400">{directions.storeAddress}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="time-outline" size={14} color="#22C55E" />
              <Text className="text-sm font-extrabold text-gray-900">{directions.duration}</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="navigate-outline" size={14} color="#9CA3AF" />
              <Text className="text-sm text-gray-500">{directions.distance}</Text>
            </View>
            <View className="flex-row items-center gap-1.5 ml-auto">
              <Text className="text-xs text-gray-400">Arrive ~{directions.arrivalTime}</Text>
            </View>
          </View>
        </View>

        {/* Steps */}
        <View className="mx-4 mt-4 bg-white rounded-2xl px-4 shadow-sm border border-gray-100">
          {directions.steps.map((step, i) => (
            <DirectionStepRow
              key={step.id}
              step={step}
              isLast={i === directions.steps.length - 1}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100 gap-3">
        <Button
          text="Share Location"
          onPress={shareLocation}
          backgroundColor="#22C55E"
          borderRadius={16}
          paddingVertical={16}
          fontSize={15}
          fontWeight="700"
        />
        <Button
          text="Open in Google Maps"
          onPress={openInMaps}
          variant="outline"
          borderColor="#E5E7EB"
          borderWidth={1.5}
          textColor="#374151"
          borderRadius={16}
          paddingVertical={16}
          fontSize={15}
          fontWeight="600"
        />
        <View className="items-center py-1">
          <Text className="text-xs text-gray-400">Arriving at {directions.arrivalTime} · {directions.storeName}</Text>
        </View>
      </View>
    </View>
    </BaseContainer>
  )
}