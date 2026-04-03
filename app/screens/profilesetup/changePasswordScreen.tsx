// screens/auth/changePasswordScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import PasswordField from '@/components/shared/PasswordField';
import Button from '@/components/shared/Button';
import { useChangePassword } from '@/services/hooks/profile/useChangePassword';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { 
    form, 
    errors, 
    loading, 
    showCurrent, 
    showNew, 
    showConfirm,
    setShowCurrent,
    setShowNew,
    setShowConfirm,
    updateField, 
    handleSave 
  } = useChangePassword();

  // Helper for visual strength indicator
  const getStrengthScore = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score > 3 ? 4 : score + 1; // Scale 1-4
  };

  const strength = form.newPassword ? getStrengthScore(form.newPassword) : 0;
  const strengthColors = ['#EF4444', '#F97316', '#EAB308', '#22C55E'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
      {/* ── Header ── */}
      <View className="flex-row items-center px-5 py-4 pt-12 border-b border-gray-50 relative">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="z-10 p-1"
        >
          <Feather name="chevron-left" size={28} color="#111827" />
        </TouchableOpacity>
        
        <View className="absolute left-0 right-0 pt-12 flex-row justify-center">
          <Text className="text-xl font-black text-gray-900 tracking-tight">
            Change Password
          </Text>
        </View>
      </View>

      <View className="px-6 py-8">
        <Text className="text-sm text-gray-500 mb-8 text-center px-4">
          Your new password must be at least 8 characters long and include special characters.
        </Text>

        {/* ── Current Password ── */}
        <Text className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
          Current Password
        </Text>
        <PasswordField
          focusedBorderColor='#22C55E'
          value={form.currentPassword}
          onChangeText={(val) => updateField('currentPassword', val)}
          placeholder="Enter current password"
          error={errors.currentPassword}
        />

        {/* ── New Password ── */}
        <Text className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2 mt-6 ml-1">
          New Password
        </Text>
        <PasswordField
          focusedBorderColor='#22C55E'
          value={form.newPassword}
          onChangeText={(val) => updateField('newPassword', val)}
          placeholder="New Password"
          error={errors.newPassword}
        />

        {/* ── Strength Bar ── */}
        {form.newPassword.length > 0 && (
          <View className="mt-3 mb-1">
            <View className="flex-row gap-1 mb-1">
              {[0, 1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 4,
                    backgroundColor: i < strength ? strengthColors[strength - 1] : '#E5E7EB',
                  }}
                />
              ))}
            </View>
            <Text
              style={{ color: strengthColors[strength - 1] ?? '#E5E7EB' }}
              className="text-[10px] font-black text-right uppercase"
            >
              {strength > 0 ? strengthLabels[strength - 1] : ''}
            </Text>
          </View>
        )}

        {/* ── Confirm New Password ── */}
        <Text className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2 mt-6 ml-1">
          Confirm New Password
        </Text>
        <PasswordField
          focusedBorderColor='#22C55E'
          value={form.confirmPassword}
          onChangeText={(val) => updateField('confirmPassword', val)}
          placeholder="Confirm New Password"
          error={errors.confirmPassword}
        />

        {/* ── Submit ── */}
        <Button
          text={loading ? "Updating..." : "Update Password"}
          backgroundColor='#000000'
          height={60}
          borderRadius={14}
          fontSize={18}
          fontWeight="700"
          disabled={loading}
          onPress={() => handleSave(() => router.back())}
          style={{ marginTop: 40 }}
        />
      </View>
    </BaseContainer>
  );
}