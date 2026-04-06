// app/screens/store/reservationConfirmedScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useReservationConfirmed } from '@/services/hooks/order/useReservationConfirmed'
import QRCodeBox from '@/components/profile/orders/QRCodeBox'
import Button from '@/components/shared/Button'
import ReservationDetailRow from '@/components/profile/orders/ReservationDetailRow'
import BaseContainer from '@/components/shared/BaseContainer'
export default function ReservationConfirmedScreen() {
  const router = useRouter()
  const { reservation, handleGetDirections, handleAddToWallet, handleEnlarge } = useReservationConfirmed()

  return (
  <BaseContainer scrollable backgroundColor='#fff'>
      <View className='pt-10'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Green success header */}
        <View className="bg-green-500 items-center pt-14 pb-10">
          <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center mb-4">
            <Ionicons name="checkmark" size={36} color="#fff" />
          </View>
          <Text className="text-white text-xl font-extrabold">Reservation Confirmed!</Text>
          <Text className="text-white/80 text-sm mt-1">Pickup by {reservation.pickupTime}</Text>
        </View>

        {/* QR Code */}
        <View className="mt-6">
          <QRCodeBox code={reservation.pickupCode} onEnlarge={handleEnlarge} />
        </View>

        {/* Details */}
        <View className="mx-4 mt-6 bg-white rounded-2xl px-4 shadow-sm">
          <ReservationDetailRow label="Store"       value={reservation.store}       />
          <ReservationDetailRow label="Address"     value={reservation.address}     />
          <ReservationDetailRow label="Pickup Time" value={reservation.pickupTime}  />
          <ReservationDetailRow label="Size"        value={reservation.size}        />
          <ReservationDetailRow label="Price"       value={`$${reservation.price.toFixed(2)}`} />
        </View>

        {/* Actions */}
        <View className="mx-4 mt-6 gap-3">
          <Button
            text="Get Directions"
            onPress={handleGetDirections}
            backgroundColor="#22C55E"
            borderRadius={16}
            paddingVertical={16}
            fontSize={15}
            fontWeight="700"
          />

          <Button
            text="Add to Wallet"
            onPress={handleAddToWallet}
            variant="outline"
            borderColor="#E5E7EB"
            borderWidth={1.5}
            textColor="#374151"
            borderRadius={16}
            paddingVertical={16}
            fontSize={15}
            fontWeight="600"
          />
        </View>
      </ScrollView>
    </View>
    </BaseContainer>
  )
}