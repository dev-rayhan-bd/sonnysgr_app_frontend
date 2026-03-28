import { View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import EmailField from '@/components/shared/EmailField';
import PasswordField from '@/components/shared/PasswordField';
import Button from '@/components/shared/Button';
import SocialButton from '@/components/shared/SocialButton';
import GoogleIcon from '@/assets/images/auth/google.svg';
import AppleIcon from '@/assets/images/auth/apple.svg';

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  form: FormState;
  errors: FormErrors;
  loading: boolean;
  updateField: (field: keyof FormState, value: string | boolean) => void;
  handleLogin: () => void;
  onForgotPassword: () => void;
}

export default function LoginForm({
  form,
  errors,
  loading,
  updateField,
  handleLogin,
  onForgotPassword,
}: LoginFormProps) {
  return (
    <View className="bg-[#EEEEEE] rounded-2xl p-4 gap-3 shadow-sm">

      {/* Email */}
      <EmailField
        value={form.email}
        onChangeText={(val) => updateField('email', val)}
        error={errors.email}
      />

      {/* Password */}
      <PasswordField
        value={form.password}
        onChangeText={(val) => updateField('password', val)}
        placeholder="Password"
        error={errors.password}
      />

      {/* Remember me & Forgot password */}
      <View className="flex-row items-center justify-between mt-1">
        <TouchableOpacity
          onPress={() => updateField('rememberMe', !form.rememberMe)}
          activeOpacity={0.8}
          className="flex-row items-center gap-2"
        >
          <View
            className={`w-[18px] h-[18px] rounded border-2 items-center justify-center ${
              form.rememberMe ? 'bg-[#4584CA] border-[#4584CA]' : 'bg-white border-gray-300'
            }`}
          >
            {form.rememberMe && <Feather name="check" size={11} color="#FFFFFF" />}
          </View>
          <Text className="text-base text-gray-500">Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
          <Text className="text-base text-[#4584CA] font-medium">Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Log in Button */}
      <Button
        text="Log in"
        variant="solid"
        useGradient
        gradientColors={['#4584CA', '#2360A5']}
        height={60}
        borderRadius={14}
        fontSize={18}
        fontWeight="700"
        disabled={loading}
        onPress={handleLogin}
      />

      {/* Divider */}
      <View className="flex-row items-center gap-2 my-1">
        <View className="flex-1 h-px bg-black" />
        <Text className="text-base text-gray-400">or continue with</Text>
        <View className="flex-1 h-px bg-black" />
      </View>

      {/* Google */}
      <SocialButton
        text="Continue with Google"
        SvgIcon={GoogleIcon}
        iconSize={20}
        textColor="#000000"
        onPress={() => {}}
      />

      {/* Apple */}
      <SocialButton
        text="Continue with Apple"
        SvgIcon={AppleIcon}
        iconSize={20}
        textColor="#000000"
        onPress={() => {}}
      />

    </View>
  );
}