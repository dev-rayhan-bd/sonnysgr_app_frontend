// components/auth/createAccountForm.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import TextField from '@/components/shared/TextField'
import EmailField from '@/components/shared/EmailField'
import PasswordField from '@/components/shared/PasswordField'
import Button from '@/components/shared/Button'
import SocialButton from '@/components/shared/SocialButton'
import DropdownField from '@/components/shared/DropdownField'
import GoogleIcon from '@/assets/images/auth/google.svg'
import AppleIcon from '@/assets/images/auth/apple.svg'

const ACCOUNT_TYPE_OPTIONS = [
  { label: 'Sneaker Buyer',    value: 'buyer',    subtitle: 'Shop & discover sneakers near me',   icon: <Feather name="shopping-bag" size={18} color="#111827" /> },
  { label: 'Store / Retailer', value: 'seller',   subtitle: 'List my inventory & manage orders',  icon: <Feather name="grid"         size={18} color="#111827" /> },
  { label: 'Trusted Reseller', value: 'reseller', subtitle: 'Sell my inventory to stores',        icon: <Feather name="tag"          size={18} color="#111827" /> },
]

interface FormState {
  fullName:        string
  email:           string
  password:        string
  confirmPassword: string
  accountType:     string | null
  agreed:          boolean
}

interface FormErrors {
  fullName?:        string
  email?:           string
  password?:        string
  confirmPassword?: string
  accountType?:     string
  agreed?:          string
}

interface CreateAccountFormProps {
  form:                FormState
  errors:              FormErrors
  loading:             boolean
  updateField:         (field: keyof FormState, value: string | boolean | null) => void
  handlecreateAccount: () => void
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

      {/* ── Full Name ── */}
      <TextField
        focusedBorderColor='#22C55E'
        placeholder="Full name"
        value={form.fullName}
        onChangeText={(val: string) => updateField('fullName', val)}
        leftIcon={<Feather name="user" size={18} />}
        error={errors.fullName}
      />

      {/* ── Email ── */}
      <EmailField
        focusedBorderColor='#22C55E'
        value={form.email}
        onChangeText={(val: string) => updateField('email', val)}
        error={errors.email}
      />

      {/* ── Account Type ── */}
      <DropdownField
        options={ACCOUNT_TYPE_OPTIONS}
        value={form.accountType}
        onChange={(val: string) => updateField('accountType', val)}
        placeholder="Select account type"
        focusedBorderColor='#22C55E'
        leftIcon={<Feather name="tag" size={18} color="#000" />}
        error={errors.accountType}
      />

      {/* ── Password ── */}
      <PasswordField
        focusedBorderColor='#22C55E'
        value={form.password}
        onChangeText={(val: string) => updateField('password', val)}
        placeholder="Password"
        error={errors.password}
      />

      {/* ── Confirm Password ── */}
      <PasswordField
        focusedBorderColor='#22C55E'
        value={form.confirmPassword}
        onChangeText={(val: string) => updateField('confirmPassword', val)}
        placeholder="Confirm Password"
        error={errors.confirmPassword}
      />

      {/* ── Terms & Conditions ── */}
      <View className="gap-1">
        <TouchableOpacity
          onPress={() => updateField('agreed', !form.agreed)}
          activeOpacity={0.8}
          className="flex-row items-center gap-2 mt-1"
        >
          <View
            className={`w-[18px] h-[18px] rounded border-2 items-center justify-center ${
              form.agreed ? 'bg-[#22C55E] border-[#22C55E]' : 'bg-white border-gray-300'
            }`}
          >
            {form.agreed && <Feather name="check" size={11} color="#FFFFFF" />}
          </View>
          <Text className="text-sm text-gray-500 flex-1">
            I agree to{' '}
            <Text className="text-[#22C55E] font-semibold">Terms &amp; Conditions</Text>
          </Text>
        </TouchableOpacity>

        {/* Only the agreed error needs a manual Text since the checkbox has no built-in error display */}
        {errors.agreed && (
          <Text className="text-xs text-red-500 ml-7">{errors.agreed}</Text>
        )}
      </View>

      {/* ── Create Account Button ── */}
      <Button
        text={loading ? 'Creating Account…' : 'Create Account'}
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

      {/* ── Divider ── */}
      <View className="flex-row items-center gap-2 my-1">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="text-sm text-gray-400">or continue with</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* ── Google ── */}
      <SocialButton
        text="Continue with Google"
        SvgIcon={GoogleIcon}
        iconSize={20}
        textColor="#111827"
        onPress={() => {}}
      />

      {/* ── Apple ── */}
      <SocialButton
        text="Continue with Apple"
        SvgIcon={AppleIcon}
        iconSize={20}
        textColor="#111827"
        onPress={() => {}}
      />

      {/* ── Privacy ── */}
      <TouchableOpacity className="mt-1">
        <Text className="text-center text-sm text-[#22C55E]">
          Terms of Use &amp; Privacy Policy
        </Text>
      </TouchableOpacity>

    </View>
  )
}