import { useState } from 'react';
import Toast from 'react-native-toast-message';

interface VerifyEmailErrors {
  email?: string;
}

export function useVerifyEmail() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<VerifyEmailErrors>({});
  const [loading, setLoading] = useState(false);

 const validate = (): boolean => {
  const newErrors: VerifyEmailErrors = {};

  if (!email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = 'Enter a valid email';
  }

  setErrors(newErrors);

  // ✅ Return false if there are errors, but no toast
  return Object.keys(newErrors).length === 0;
};

  const handleSend = async (onSuccess?: () => void, from?: string) => {
    if (!validate()) return;

    try {
      setLoading(true);

      // TODO: replace with your actual API call
      await new Promise(res => setTimeout(res, 1500));

      if (from === 'forgot-password') {
        Toast.show({
          type: 'success',
          text1: 'Reset Code Sent!',
          text2: `A password reset code has been sent to ${email}`,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Verification Code Sent!',
          text2: `A verification code has been sent to ${email}`,
        });
      }

      await new Promise(res => setTimeout(res, 500));
      onSuccess?.();

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed to Send',
        text2: error?.message ?? 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    errors,
    loading,
    handleSend,
  };
}