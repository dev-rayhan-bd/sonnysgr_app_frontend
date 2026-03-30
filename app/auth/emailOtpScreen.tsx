import { View, Text, TouchableOpacity } from 'react-native';
import BaseContainer from '@/components/shared/BaseContainer';

import OTPInput, { OTPInputHandle } from '@/components/auth/OtpInput';
import { useEmailOtp } from '@/services/hooks/auth/useEmailOtp';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';

export default function EmailOtpScreen() {
  const { from } = useLocalSearchParams<{ from: string }>();
  const otpRef = useRef<OTPInputHandle | null>(null);
  const { loading, countdown, handleChange, handleContinue, handleResend } = useEmailOtp({ otpRef, from });

  const onSuccess = () => {
    if (from === 'forgot-password') {
      router.replace('/auth/resetPasswordScreen');
    } else {
      router.replace('/profilesetup/size');
    }
  };

  return (
    <BaseContainer backgroundColor="#F8F9FA" scrollable>
        <View style={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>


          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              OTP Verification
            </Text>
            <Text className="text-base text-gray-500 text-center">
              Enter 6 digits code that received on{'\n'}your email
            </Text>
          </View>

          {/* OTP Input */}
          <View className="items-center mb-6">
            <OTPInput
              ref={otpRef}
              length={6}
              onChange={handleChange}
              onComplete={(code) => handleContinue(code, onSuccess)}
            />
          </View>

          {/* Loading */}
          {loading && (
            <Text className="text-center text-base text-[#22C55E] mb-4">
              Verifying...
            </Text>
          )}

          {/* Resend */}
          <View className="items-center mb-6">
            {countdown > 0 ? (
              <Text className="text-base text-gray-500">
                Resend code{' '}
                <Text className="text-[#22C55E] font-semibold">
                  {String(Math.floor(countdown / 60)).padStart(2, '0')}:
                  {String(countdown % 60).padStart(2, '0')}
                </Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={loading}>
                <Text className="text-base text-gray-500">
                  Resend code{' '}
                  <Text className="text-[#22C55E] font-semibold">Now</Text>
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Wrong email */}
          <View className="items-center mt-4">
            <Text className="text-base text-gray-500">
              Wrong email?{' '}
              <Text
                className="text-[#22C55E] font-semibold"
                onPress={() => !loading && router.replace({
                  pathname: '/auth/verifyEmailScreen',
                  params: { from: from ?? 'registration' },
                })}
              >
                Change it
              </Text>
            </Text>
          </View>

        </View>
    </BaseContainer>
  );
}