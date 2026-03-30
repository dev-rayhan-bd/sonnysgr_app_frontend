import { View, Text } from 'react-native';
import BaseContainer from '@/components/shared/BaseContainer';
import PasswordField from '@/components/shared/PasswordField';
import Button from '@/components/shared/Button';
import { useResetPassword } from '@/services/hooks/auth/useResetPassword';
import { router } from 'expo-router';

export default function ResetPasswordScreen() {
  const { form, errors, loading, strength, updateField, handleSave } = useResetPassword();

  const onSuccess = () => {
    router.replace('/auth/signInScreen');
  };

  const strengthColors = ['#EF4444', '#F97316', '#EAB308', '#22C55E'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <BaseContainer backgroundColor="#F8F9FA" scrollable>

        <View
          style={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingVertical: 40,
          }}
        >

          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Reset Password
            </Text>
            <Text className="text-base text-gray-500 text-center">
              Change your password
            </Text>
          </View>

          {/* New Password */}
          <Text className="text-base text-gray-700 font-medium mb-2">
            New Password
          </Text>
          <PasswordField
          focusedBorderColor='#22C55E'
            value={form.password}
            onChangeText={(val) => updateField('password', val)}
            placeholder="New Password"
            error={errors.password}
          />

          {/* Password Strength Bar */}
          {form.password.length > 0 && (
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
                className="text-xs font-medium text-right"
              >
                {strength > 0 ? strengthLabels[strength - 1] : ''}
              </Text>
            </View>
          )}

          {/* Confirm Password */}
          <Text className="text-base text-gray-700 font-medium mb-2 mt-4">
            Confirm Password
          </Text>
          <PasswordField
          focusedBorderColor='#22C55E'
            value={form.confirmPassword}
            onChangeText={(val) => updateField('confirmPassword', val)}
            placeholder="Confirm Password"
            error={errors.confirmPassword}
          />

          {/* Save Button */}
          <Button
            text="Save"
            variant="solid"
            backgroundColor='#000000'
            height={60}
            width="100%"
            borderRadius={14}
            fontSize={18}
            fontWeight="700"
            disabled={loading}
            onPress={() => handleSave(onSuccess)}
            style={{ marginTop: 24 }}
          />

        </View>

    </BaseContainer>
  );
}
