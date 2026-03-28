// app/auth/registrationScreen.tsx
import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import BaseContainer    from '@/components/shared/BaseContainer'
import CreateAccountForm from '@/components/auth/CreateAccountForm'
import { useCreateAccount } from '@/services/hooks/auth/useCreateAccount'

export default function createAccountScreen() {
  const { form, errors, loading, updateField, handleCreateAccount } =
    useCreateAccount()

  const onSuccess = () => {
    router.replace('/')
  }

  return (
    <BaseContainer scrollable>

      <View className="flex-1 justify-center px-6 py-10">

        {/* ── Header ────────────────────────────────────────── */}
        <View className="items-center mb-8">

          {/* Logo */}
          <View className="flex-row items-center mb-5">
            <View className="w-10 h-10 rounded-xl bg-[#22C55E] items-center justify-center mr-2">
              <Text className="text-white font-black text-lg">G</Text>
            </View>
            <Text className="text-3xl font-black text-gray-900 tracking-wide">
              Gd<Text className="text-[#22C55E]">SNKR</Text>
            </Text>
          </View>

          <Text className="text-3xl font-bold text-gray-900 mb-1.5">
            Create Account
          </Text>
          <Text className="text-sm text-gray-500 text-center leading-5">
            Create one account to use both web and app
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
            <Text className="text-sm text-[#4584CA] font-semibold">
              Sign in
            </Text>
          </TouchableOpacity>
        </View>

      </View>

    </BaseContainer>
  )
}