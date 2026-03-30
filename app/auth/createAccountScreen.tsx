// app/auth/registrationScreen.tsx
import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import CreateAccountForm from '@/components/auth/CreateAccountForm'
import { useCreateAccount } from '@/services/hooks/auth/useCreateAccount'
import GoSnkrLogo from "@/assets/images/auth/create_account.svg"
import ShowPicture from '@/components/shared/ShowPicture'

export default function createAccountScreen() {
  const { form, errors, loading, updateField, handleCreateAccount } =
    useCreateAccount()

  const onSuccess = () => {
    router.replace('/')
  }

  return (
    <BaseContainer backgroundColor='#ffff' scrollable>
      <View className="flex-1 justify-center px-6 py-10">

        {/* ── Header ────────────────────────────────────────── */}
        <View className="items-center mb-4">
          <View  className='mt-4'>
            <ShowPicture
              SvgComponent={GoSnkrLogo}
              width={200}
              height={80}
              preserveAspectRatio="xMidYMid meet"
            />
          </View>
        </View>

        {/* Left-aligned text block */}
        <View className="mb-8">
          <Text className="text-base font-semibold text-[#22C55E] tracking-widest uppercase mb-3">
            Create Account
          </Text>
          <Text className="text-3xl font-black text-gray-900 mb-1.5">
            Join GoSNKR
          </Text>
          <Text className="text-base text-gray-500 leading-5">
            The sneaker map is waiting.
          </Text>
        </View>

        {/* ── Form ──────────────────────────────────────────── */}
        <CreateAccountForm
          form={form}
          errors={errors}
          loading={loading}
          updateField={updateField}
          handlecreateAccount={() => handleCreateAccount(onSuccess)}
        />

        {/* ── Footer ────────────────────────────────────────── */}
        <View className="flex-row justify-center items-center mt-6 gap-1">
          <Text className="text-sm text-gray-500">
            Already have an account?
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.replace('/auth/signInScreen')}
          >
            <Text className="text-sm text-[#22C55E] font-semibold">
              Sign in
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Terms ─────────────────────────────────────────── */}
        <View className="mt-4 px-4">
          <Text className="text-xs text-gray-400 text-center leading-5">
            By continuing, you agree to our{' '}
            <Text
              className="text-xs text-[#22C55E] font-semibold"
            >
              Terms
            </Text>
            {' '}and{' '}
            <Text
              className="text-xs text-[#22C55E] font-semibold"
            >
              Privacy Policy
            </Text>
          </Text>
        </View>

      </View>
    </BaseContainer>
  )
}