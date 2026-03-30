// components/auth/SigninForm.tsx
import { View, Text, TouchableOpacity } from 'react-native'
import EmailField from '@/components/shared/EmailField'
import PasswordField from '@/components/shared/PasswordField'
import Button from '@/components/shared/Button'
import SocialButton from '@/components/shared/SocialButton'
import GoogleIcon from '@/assets/images/auth/google.svg'
import AppleIcon from '@/assets/images/auth/apple.svg'

interface SigninFormProps {
  form: { email: string; password: string }
  errors: { email?: string; password?: string }
  loading: boolean
  updateField: (field: 'email' | 'password', value: string) => void
  handleSignin: () => void
  handleFaceID: () => void
  onForgotPassword: () => void
  onCreateAccount: () => void
}

export default function SigninForm({
  form,
  errors,
  loading,
  updateField,
  handleSignin,
  handleFaceID,
  onForgotPassword,
  onCreateAccount,
}: SigninFormProps) {
  return (
    <View className="gap-3">

      {/* ── Email ── */}
      <EmailField
      focusedBorderColor='#22C55E'
        value={form.email}
        onChangeText={(val: string) => updateField('email', val)}
        error={errors.email}
      />

      {/* ── Password ── */}
      <View>
        <PasswordField
            focusedBorderColor='#22C55E'
          value={form.password}
          onChangeText={(val: string) => updateField('password', val)}
          placeholder="Your password"
          error={errors.password}
        />

        {/* Forgot password — right-aligned, sits just below the field */}
        <TouchableOpacity
          onPress={onForgotPassword}
          activeOpacity={0.7}
          className="self-end mt-2"
        >
          <Text className="text-sm text-[#22C55E] font-semibold">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Sign In Button ── */}
      <Button
        text={loading ? 'Signing in…' : 'Sign In'}
        variant="solid"
        backgroundColor="#000000"
        height={56}
        borderRadius={14}
        fontSize={17}
        fontWeight="700"
        disabled={loading}
        opacity={loading ? 0.7 : 1}
        onPress={handleSignin}
      />

      {/* ── Divider ── */}
      <View className="flex-row items-center gap-3 my-1">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="text-xs text-gray-400">or</Text>
        <View className="flex-1 h-px bg-gray-200" />
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

      {/* ── Footer ── */}
      <View className="flex-row justify-center items-center gap-1 mt-2">
        <Text className="text-sm text-gray-500">New to GoSNKR?</Text>
        <TouchableOpacity onPress={onCreateAccount} activeOpacity={0.7}>
          <Text className="text-sm text-[#22C55E] font-semibold">
            Create account
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}