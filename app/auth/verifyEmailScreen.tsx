import { View, Text } from 'react-native';
import BaseContainer from '@/components/shared/BaseContainer';
import EmailField from '@/components/shared/EmailField';
import Button from '@/components/shared/Button';
import ShowPicture from '@/components/shared/ShowPicture';
import VerifyEmailIcon from '@/assets/images/auth/verify-email.svg';
import { useVerifyEmail } from '@/services/hooks/auth/useVerifyEmail';
import { router, useLocalSearchParams } from 'expo-router';

export default function VerifyEmailScreen() {
  const { from } = useLocalSearchParams<{ from: string }>();
  const { email, setEmail, errors, loading, handleSend } = useVerifyEmail();

  const title = from === 'forgot-password' ? 'Forgot Password' : 'Verify Your Email';
  const subtitle = from === 'forgot-password'
    ? 'No worries . Enter your email to reset your password'
    : "No worries . Enter your email and we'll sent a 6-digit verification code.";

  const onSuccess = () => {
    router.replace({
      pathname: '/auth/emailOtpScreen',
      params: { from: from ?? 'registration' },
    });
  };

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
    
        <View style={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>

          {/* Icon */}
          <View className="items-center mb-6">
            <ShowPicture
              SvgComponent={VerifyEmailIcon}
              width={120}
              height={120}
            />
          </View>

          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              {title}
            </Text>
            <Text className="text-base text-gray-500 text-center">
              {subtitle}
            </Text>
          </View>

          {/* Email Input */}
          <Text className="text-base text-gray-700 font-medium mb-2">
            Enter your email
          </Text>
          <EmailField
          focusedBorderColor='#22C55E'
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          {/* Send Button */}
          <Button
            text="Send"
            variant="solid"
            backgroundColor='#000'
            height={60}
            width="100%"
            borderRadius={14}
            fontSize={18}
            fontWeight="700"
            disabled={loading}
            onPress={() => handleSend(onSuccess, from)}
            style={{ marginTop: 16 }}
          />

        </View>

    </BaseContainer>
  );
}