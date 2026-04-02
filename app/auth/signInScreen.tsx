// app/auth/signinScreen.tsx
import { View, Text, StatusBar } from 'react-native'
import { router } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import SigninForm from '@/components/auth/SigninForm'
import { useSignin } from '@/services/hooks/auth/useSignin'
import GoSnkrLogo from '@/assets/images/auth/sign_in.svg'
import ShowPicture from '@/components/shared/ShowPicture'

export default function SigninScreen() {
  const { form, errors, loading, updateField, handleSignin, handleFaceID } =
    useSignin()

  const onSuccess = () => {
    router.replace('/tabs/discoverScreen')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#111827' }}>
      <StatusBar barStyle="light-content" />

      {/* ── Dark header ── */}
      <View
        style={{
          paddingTop: 64,
          paddingBottom: 72,
          alignItems: 'center',
          gap: 6,
        }}
      >
        <ShowPicture
          SvgComponent={GoSnkrLogo}
          width={160}
          height={52}
          preserveAspectRatio="xMidYMid meet"
        />
        <Text
          style={{
            color: '#6B7280',
            fontSize: 11,
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginTop: 4,
          }}
        >
          The Sneaker Map
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          marginTop: -32,
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 40,
        }}
      >
        <BaseContainer backgroundColor="#fff" scrollable>

          {/* Heading */}
          <View style={{ marginBottom: 28 }}>
            <Text style={{ fontSize: 30, fontWeight: '900', color: '#111827', marginBottom: 6 }}>
              Welcome back.
            </Text>
            <Text style={{ fontSize: 14, color: '#9CA3AF' }}>
              Sign in to your account.
            </Text>
          </View>

          {/* Form */}
          <SigninForm
            form={form}
            errors={errors}
            loading={loading}
            updateField={updateField}
            handleSignin={() => handleSignin(onSuccess)}
            handleFaceID={() => handleFaceID(onSuccess)}
            onForgotPassword={() => router.push({
              pathname: '/auth/verifyEmailScreen',
              params: { from: 'forgot-password' },
            })}
            onCreateAccount={() => router.replace('/auth/createAccountScreen')}
          />

        </BaseContainer>
      </View>

    </View>
  )
}