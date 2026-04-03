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

import TextField from '@/components/shared/TextField'
import EmailField from '@/components/shared/EmailField'
import Button from '@/components/shared/Button'

interface PrivacyItemProps {
  label: string;
  icon: string;
  isActive: boolean;
  onToggle: () => void;
}

const PrivacyItem = ({ label, icon, isActive, onToggle }: PrivacyItemProps) => (
  <View className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-3.5 mb-2 shadow-sm border border-gray-50">
    <View className="flex-row items-center gap-3 flex-1">
      <View className="w-10 h-10 items-center justify-center">
        <Text style={{ fontSize: 22 }}>{icon}</Text>
      </View>
      <Text className="text-[15px] font-bold text-gray-800 flex-1">{label}</Text>
    </View>

    <View className="flex-row bg-gray-100 p-1 rounded-full w-36">
      <TouchableOpacity
        onPress={() => !isActive && onToggle()}
        activeOpacity={0.7}
        className={`flex-1 py-1.5 rounded-full items-center ${isActive ? 'bg-black' : 'bg-transparent'}`}
      >
        <Text className={`text-[11px] font-black ${isActive ? 'text-white' : 'text-gray-400'}`}>Public</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => isActive && onToggle()}
        activeOpacity={0.7}
        className={`flex-1 py-1.5 rounded-full items-center ${!isActive ? 'bg-black' : 'bg-transparent'}`}
      >
        <Text className={`text-[11px] font-black ${!isActive ? 'text-white' : 'text-gray-400'}`}>Private</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const EditProfileScreen = () => {
  const router = useRouter()
  const {
    form,
    errors,
    loading,
    updateField,
    updatePrivacy,
    handleSave,
    handleChangePhoto,
  } = useEditProfile()

  return (
    <BaseContainer scrollable backgroundColor='#fff'>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 pt-12 border-b border-gray-50 relative">
        <TouchableOpacity onPress={() => router.back()} className="z-10 p-1">
          <Feather name="chevron-left" size={28} color="#111827" />
        </TouchableOpacity>
        <View className="absolute left-0 right-0 pt-12 flex-row justify-center">
          <Text className="text-xl font-black text-gray-900 tracking-tight">Edit Profile</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Avatar block */}
        <View className="items-center py-8">
          <View className="relative mb-5">
            <View className="w-28 h-28 rounded-full bg-orange-500 items-center justify-center shadow-lg">
              <Text className="text-white text-4xl font-black">
                {form.fullName ? form.fullName.substring(0, 2).toUpperCase() : 'SG'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleChangePhoto}
              className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white items-center justify-center"
            >
              <MaterialIcons name="camera-alt" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-sm font-bold text-green-600">Update Profile Picture</Text>
        </View>

        {/* Personal Info */}
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
          <TextField
            focusedBorderColor='#22C55E'
            placeholder="Tell us about yourself..."
            value={form.bio}
            onChangeText={(val) => updateField('bio', val)}
            leftIcon={<Feather name="align-left" size={18} color="#6B7280" />}
            multiline
            numberOfLines={4}
            maxLength={150}
          />
        </View>

        {/* Privacy Section (Matching Image Style) */}
        <View className="px-5 mt-8">
          <Text className="text-[12px] font-black text-gray-400 uppercase tracking-[2px] mb-4 ml-1">
            Privacy
          </Text>
          <PrivacyItem
            label="Profile Visibility"
            icon="👁️"
            isActive={form.privacy.profileVisibility}
            onToggle={() => updatePrivacy('profileVisibility', 'Profile Visibility')}
          />
          <PrivacyItem
            label="Wishlist"
            icon="🖤"
            isActive={form.privacy.wishlist}
            onToggle={() => updatePrivacy('wishlist', 'Wishlist')}
          />
          <PrivacyItem
            label="Purchase History"
            icon="🛍️"
            isActive={form.privacy.purchaseHistory}
            onToggle={() => updatePrivacy('purchaseHistory', 'Purchase History')}
          />
          <PrivacyItem
            label="Locker / Collection"
            icon="👟"
            isActive={form.privacy.lockerCollection}
            onToggle={() => updatePrivacy('lockerCollection', 'Collection')}
          />
          <PrivacyItem
            label="VIP Status"
            icon="🏆"
            isActive={form.privacy.vipStatus}
            onToggle={() => updatePrivacy('vipStatus', 'VIP Status')}
          />
          <PrivacyItem
            label="Activity"
            icon="📊"
            isActive={form.privacy.activity}
            onToggle={() => updatePrivacy('activity', 'Activity')}
          />
        </View>

        {/* Security */}
        <View className="px-5 mt-8">
          <Text className="text-[12px] font-black text-gray-400 uppercase tracking-[2px] mb-4 ml-1">
            Security
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/screens/profilesetup/changePasswordScreen')}
            className="flex-row items-center justify-between bg-gray-50 rounded-2xl px-5 py-5"
          >
            <View className="flex-row items-center gap-3">
              <Feather name="lock" size={18} color="#4B5563" />
              <Text className="text-base font-bold text-gray-800">Change Password</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#D1D5DB" />
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        <View className="px-5 mt-10">
          <Button
            text={loading ? 'Updating…' : 'Save Changes'}
            onPress={() => handleSave(() => router.back())}
            backgroundColor="#000000"
            height={60}
            borderRadius={14}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

export default EditProfileScreen