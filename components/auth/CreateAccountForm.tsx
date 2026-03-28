// components/auth/createAccountForm.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Feather       from '@expo/vector-icons/Feather'
import TextField     from '@/components/shared/TextField'
import EmailField    from '@/components/shared/EmailField'
import PasswordField from '@/components/shared/PasswordField'
import Button        from '@/components/shared/Button'
import SocialButton  from '@/components/shared/SocialButton'
import GoogleIcon    from '@/assets/images/auth/google.svg'
import AppleIcon     from '@/assets/images/auth/apple.svg'

interface FormState {
  fullName:        string
  email:           string
  password:        string
  confirmPassword: string
  agreed:          boolean
}

interface FormErrors {
  fullName?:        string
  email?:           string
  password?:        string
  confirmPassword?: string
  agreed?:          string
}

interface CreateAccountFormProps {
  form:                 FormState
  errors:               FormErrors
  loading:              boolean
  updateField:          (field: keyof FormState, value: string | boolean | null) => void
  handlecreateAccount:  () => void
}

export default function CreateAccountForm({
  form,
  errors,
  loading,
  updateField,
  handlecreateAccount,
}: CreateAccountFormProps) {
  return (
    <View className="rounded-2xl p-4 gap-3">

      {/* ── Full Name ───────────────────────────────────────── */}
      <View className="gap-1">
        <TextField
          placeholder="Full name"
          value={form.fullName}
          onChangeText={(val) => updateField('fullName', val)}
          leftIcon={<Feather name="user" size={18} />}
          error={errors.fullName}
        />
        {errors.fullName && (
          <Text className="text-xs text-red-500 ml-1">{errors.fullName}</Text>
        )}
      </View>

      {/* ── Email ───────────────────────────────────────────── */}
      <View className="gap-1">
        <EmailField
          value={form.email}
          onChangeText={(val) => updateField('email', val)}
          error={errors.email}
        />
        {errors.email && (
          <Text className="text-xs text-red-500 ml-1">{errors.email}</Text>
        )}
      </View>

      {/* ── Password ────────────────────────────────────────── */}
      <View className="gap-1">
        <PasswordField
          value={form.password}
          onChangeText={(val) => updateField('password', val)}
          placeholder="Password"
          error={errors.password}
        />
        {errors.password && (
          <Text className="text-xs text-red-500 ml-1">{errors.password}</Text>
        )}
      </View>

      {/* ── Confirm Password ────────────────────────────────── */}
      <View className="gap-1">
        <PasswordField
          value={form.confirmPassword}
          onChangeText={(val) => updateField('confirmPassword', val)}
          placeholder="Confirm Password"
          error={errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <Text className="text-xs text-red-500 ml-1">{errors.confirmPassword}</Text>
        )}
      </View>

      {/* ── Terms & Conditions ──────────────────────────────── */}
      <View className="gap-1">
        <TouchableOpacity
          onPress={() => updateField('agreed', !form.agreed)}
          activeOpacity={0.8}
          className="flex-row items-center gap-2 mt-1"
        >
          <View
            className={`w-[18px] h-[18px] rounded border-2 items-center justify-center ${
              form.agreed
                ? 'bg-[#4584CA] border-[#4584CA]'
                : 'bg-white border-gray-300'
            }`}
          >
            {form.agreed && (
              <Feather name="check" size={11} color="#FFFFFF" />
            )}
          </View>
          <Text className="text-sm text-gray-500 flex-1">
            I agree to{' '}
            <Text className="text-[#4584CA] font-semibold">
              Terms &amp; Conditions
            </Text>
          </Text>
        </TouchableOpacity>
        {errors.agreed && (
          <Text className="text-xs text-red-500 ml-7">{errors.agreed}</Text>
        )}
      </View>

      {/* ── Create Account Button ────────────────────────────── */}
      <Button
        text={loading ? 'Creating Account...' : 'Create Account'}
        variant="solid"
        backgroundColor="#000000"
        height={60}
        borderRadius={14}
        fontSize={18}
        fontWeight="700"
        disabled={loading}
        opacity={loading ? 0.7 : 1}
        onPress={handlecreateAccount}
      />

      {/* ── Divider ─────────────────────────────────────────── */}
      <View className="flex-row items-center gap-2 my-1">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="text-sm text-gray-400">or continue with</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* ── Google ──────────────────────────────────────────── */}
      <SocialButton
        text="Continue with Google"
        SvgIcon={GoogleIcon}
        iconSize={20}
        textColor="#111827"
        onPress={() => {}}
      />

      {/* ── Apple ───────────────────────────────────────────── */}
      <SocialButton
        text="Continue with Apple"
        SvgIcon={AppleIcon}
        iconSize={20}
        textColor="#111827"
        onPress={() => {}}
      />

      {/* ── Privacy ─────────────────────────────────────────── */}
      <TouchableOpacity className="mt-1">
        <Text className="text-center text-sm text-[#4584CA]">
          Terms of Use &amp; Privacy Policy
        </Text>
      </TouchableOpacity>

    </View>
  )
}