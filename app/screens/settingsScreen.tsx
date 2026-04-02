// screens/SettingsScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

type RowProps = {
  icon: React.ReactNode
  label: string
  value?: string
  onPress?: () => void
  destructive?: boolean
  valueColor?: string
}

const Row = ({ icon, label, value, onPress, destructive, valueColor }: RowProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.6}
    className="flex-row items-center px-5 py-5 bg-white"
  >
    <View className="w-8 items-center mr-3">{icon}</View>
    <Text className={`flex-1 text-base font-semibold ${destructive ? 'text-red-500' : 'text-gray-900'}`}>
      {label}
    </Text>
    {value && (
      <View className="bg-gray-100 px-3 py-1 rounded-lg mr-2">
        <Text className={`text-sm font-bold ${valueColor || 'text-gray-500'}`}>{value}</Text>
      </View>
    )}
    {!destructive && <Feather name="chevron-right" size={18} color="#D1D5DB" />}
  </TouchableOpacity>
)

const GridItem = ({ icon, label, count }: { icon: React.ReactNode, label: string, count?: string }) => (
  <TouchableOpacity className="flex-1 bg-white p-6 rounded-3xl items-center justify-center border border-gray-50 shadow-sm">
    <View className="mb-2">{icon}</View>
    <Text className="text-gray-900 font-bold text-sm text-center">
      {label} {count ? `(${count})` : ''}
    </Text>
  </TouchableOpacity>
)

const Divider = () => <View className="h-px bg-gray-50 ml-16" />

const SectionHeader = ({ title }: { title: string }) => (
  <Text className="text-[12px] font-black tracking-[2px] text-gray-400 uppercase px-6 pt-8 pb-3">
    {title}
  </Text>
)

export default function SettingsScreen() {
  const router = useRouter()

  return (
    <BaseContainer scrollable backgroundColor='#fff'>
      {/* ── Header ── */}
      <View className="flex-row items-center px-5 py-4 pt-12 border-b border-gray-50 relative">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="z-10 p-1"
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={28} color="#111827" />
        </TouchableOpacity>
        
        <View className="absolute left-0 right-0 pt-12 flex-row justify-center">
          <Text className="text-xl font-black text-gray-900 tracking-tight">
            Settings
          </Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* ── Grid Section (Image 1) ── */}
        <View className="px-4 pt-6 flex-row gap-3">
          <GridItem icon={<Feather name="shopping-bag" size={24} color="#22C55E" />} label="My Orders" />
          <GridItem icon={<Feather name="heart" size={24} color="#EF4444" />} label="Wishlist" count="14" />
        </View>
        <View className="px-4 pt-3 flex-row gap-3">
          <GridItem icon={<Feather name="bell" size={24} color="#3B82F6" />} label="Wanted Pairs" />
          <GridItem icon={<Feather name="star" size={24} color="#F59E0B" />} label="My Reviews" />
        </View>

        {/* ── PAYMENTS (Image 4) ── */}
        <SectionHeader title="Payments" />
        <View className="bg-gray-50/50 rounded-3xl mx-4 overflow-hidden border border-gray-100">
          <Row
            icon={<Ionicons name="card-outline" size={22} color="#374151" />}
            label="Payment Methods"
            value="Visa •• 4242"
            onPress={() => {}}
          />
          <Divider />
          <Row
            icon={<MaterialCommunityIcons name="ticket-percent-outline" size={22} color="#374151" />}
            label="Purchase History"
            onPress={() => {}}
          />
          <Divider />
          <Row
            icon={<Ionicons name="wallet-outline" size={22} color="#374151" />}
            label="Sell-to-Store Balance"
            value="$10 credit"
            valueColor="text-green-500"
            onPress={() => {}}
          />
        </View>

        {/* ── LOCATION (Image 3) ── */}
        <SectionHeader title="Location" />
        <View className="bg-gray-50/50 rounded-3xl mx-4 overflow-hidden border border-gray-100">
          <Row
            icon={<Ionicons name="location-outline" size={22} color="#374151" />}
            label="Location Access"
            value="Always"
            onPress={() => {}}
          />
          <Divider />
          <Row
            icon={<Feather name="navigation" size={20} color="#374151" />}
            label="Discovery Radius"
            value="10 miles"
            onPress={() => {}}
          />
          <Divider />
          <Row
            icon={<Feather name="home" size={20} color="#374151" />}
            label="Home Location"
            value="Miami, FL"
            onPress={() => {}}
          />
        </View>

        {/* ── SUPPORT & LEGAL (Image 2) ── */}
        <SectionHeader title="Support & Legal" />
        <View className="bg-gray-50/50 rounded-3xl mx-4 overflow-hidden border border-gray-100">
          <Row
            icon={<Feather name="help-circle" size={20} color="#374151" />}
            label="Help Center"
            onPress={() => {}}
          />
          <Divider />
          <Row
            icon={<MaterialCommunityIcons name="bug-outline" size={22} color="#374151" />}
            label="Report a Bug"
            onPress={() => {}}
          />
          <Divider />
          <Row
            icon={<Feather name="file-text" size={20} color="#374151" />}
            label="Terms of Service"
            onPress={() => {}}
          />
          <Divider />
          <Row
            icon={<Feather name="shield" size={20} color="#374151" />}
            label="Privacy Policy"
            onPress={() => {}}
          />
          <Divider />
          <Row
            icon={<Feather name="star" size={20} color="#374151" />}
            label="Rate GoSNKR"
            onPress={() => {}}
          />
          <Divider />
          <Row
            icon={<Feather name="share-2" size={20} color="#374151" />}
            label="Share App"
            onPress={() => {}}
          />
        </View>

        {/* ── ACCOUNT ACTIONS ── */}
        <SectionHeader title="Account Actions" />
        <View className="bg-gray-50/50 rounded-3xl mx-4 overflow-hidden border border-gray-100 mb-10">
          <Row
            icon={<Feather name="log-out" size={20} color="#EF4444" />}
            label="Sign Out"
            destructive
            onPress={() => console.log('Sign Out')}
          />
          <Divider />
          <Row
            icon={<Feather name="trash-2" size={20} color="#EF4444" />}
            label="Delete Account"
            destructive
            onPress={() => console.log('Delete Account')}
          />
        </View>
      </ScrollView>
    </BaseContainer>
  )
}