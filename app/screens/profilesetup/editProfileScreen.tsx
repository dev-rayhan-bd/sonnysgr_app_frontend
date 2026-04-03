// screens/EditProfileScreen.tsx
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import { useEditProfile } from '@/services/hooks/profile/useEditProfile'

// Using your actual shared components
import TextField from '@/components/shared/TextField'
import EmailField from '@/components/shared/EmailField'
import Button from '@/components/shared/Button'

const EditProfileScreen = () => {
  const router = useRouter()
  const {
    form,
    errors,
    loading,
    updateField,
    handleSave,
    handleChangePhoto,
  } = useEditProfile()

  return (
    <BaseContainer scrollable backgroundColor='#fff'>
      {/* ── Header: Centered Text ────────────────────────────────────────── */}
      <View className="flex-row items-center px-5 py-4 pt-12 border-b border-gray-50 relative">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="z-10 p-1"
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={28} color="#111827" />
        </TouchableOpacity>
        
        {/* Absolute positioning ensures the title is dead-center regardless of the button */}
        <View className="absolute left-0 right-0 pt-12 flex-row justify-center">
          <Text className="text-xl font-black text-gray-900 tracking-tight">
            Edit Profile
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* ── Avatar block ── */}
        <View className="items-center py-8">
          <View className="relative mb-5">
            <View className="w-28 h-28 rounded-full bg-orange-500 items-center justify-center shadow-lg">
              {/* Fallback initials */}
              <Text className="text-white text-4xl font-black">
                {form.fullName ? form.fullName.substring(0, 2).toUpperCase() : 'SG'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleChangePhoto}
              activeOpacity={0.9}
              className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white items-center justify-center"
            >
              <MaterialIcons name="camera-alt" size={18} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-sm font-bold text-green-600">
            Update Profile Picture
          </Text>
        </View>

        {/* ── Personal Info (Using your Shared Components) ── */}
        <View className="px-5 gap-y-4">
          <Text className="text-[12px] font-black text-gray-400 uppercase tracking-[2px] mb-1 ml-1">
            Personal Information
          </Text>

          <TextField
            focusedBorderColor='#22C55E'
            placeholder="Full Name"
            value={form.fullName}
            onChangeText={(val) => updateField('fullName', val)}
            leftIcon={<Feather name="user" size={18} color="#6B7280" />}
            error={errors.fullName}
          />

          <EmailField
            focusedBorderColor='#22C55E'
            value={form.email}
            onChangeText={(val) => updateField('email', val)}
            error={errors.email}
          />

          {/* Using TextField with multiline for the Bio */}
          <TextField
            focusedBorderColor='#22C55E'
            placeholder="Tell us about yourself..."
            value={form.bio}
            onChangeText={(val) => updateField('bio', val)}
            leftIcon={<Feather name="align-left" size={18} color="#6B7280" />}
            error={errors.bio}
            multiline
            numberOfLines={4}
            maxLength={150}
          />
          {/* Bio Count display */}
          <View className="flex-row justify-end -mt-2 mr-2">
            <Text className="text-[10px] font-bold text-gray-400">
              {form.bio?.length || 0}/150
            </Text>
          </View>
        </View>

        {/* ── Security ── */}
        <View className="px-5 mt-8">
          <Text className="text-[12px] font-black text-gray-400 uppercase tracking-[2px] mb-4 ml-1">
            Security
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/screens/profilesetup/changePasswordScreen')}
            activeOpacity={0.7}
            className="flex-row items-center justify-between bg-gray-50 rounded-2xl px-5 py-5 mb-3"
          >
            <View className="flex-row items-center gap-3">
              <Feather name="lock" size={18} color="#4B5563" />
              <Text className="text-base font-bold text-gray-800">
                Change Password
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#D1D5DB" />
          </TouchableOpacity>
        </View>

        {/* ── Action Button ── */}
        <View className="px-5 mt-10">
          <Button
            text={loading ? 'Updating…' : 'Save Changes'}
            onPress={() => handleSave(() => router.back())}
            backgroundColor="#000000"
            height={60}
            borderRadius={14}
            fontSize={18}
            fontWeight="700"
            disabled={loading}
            opacity={loading ? 0.7 : 1}
          />
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

export default EditProfileScreen