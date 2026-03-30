import { useState, useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { OTPInputHandle } from '@/components/auth/OtpInput';

interface UseEmailOtpProps {
  otpRef: React.RefObject<OTPInputHandle | null>;
  countdownSeconds?: number;
  from?: string;
}

export function useEmailOtp({ otpRef, countdownSeconds = 54, from }: UseEmailOtpProps) {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(countdownSeconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = () => {
    setCountdown(countdownSeconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startCountdown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleChange = (digits: string[]) => {};

const handleContinue = async (code: string, onSuccess?: () => void) => {
  if (code.length < 6) {
    // ✅ Just return early without showing a toast
    return;
  }

  try {
    setLoading(true);

    await new Promise(res => setTimeout(res, 1500));

    if (from === 'forgot-password') {
      Toast.show({
        type: 'success',
        text1: 'Code Verified!',
        text2: 'You can now reset your password.',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Email Verified!',
        text2: 'Your account is ready. Please log in.',
      });
    }

    await new Promise(res => setTimeout(res, 500));
    onSuccess?.();

  } catch (error: any) {
    if (from === 'forgot-password') {
      Toast.show({
        type: 'error',
        text1: 'Invalid Code',
        text2: 'The reset code is incorrect. Please try again.',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: 'The code you entered is incorrect.',
      });
    }
    otpRef.current?.reset();
  } finally {
    setLoading(false);
  }
};

  const handleResend = async () => {
    try {
      await new Promise(res => setTimeout(res, 500));
      otpRef.current?.reset();
      startCountdown();

      if (from === 'forgot-password') {
        Toast.show({
          type: 'info',
          text1: 'Code Resent!',
          text2: 'A new password reset code has been sent.',
        });
      } else {
        Toast.show({
          type: 'info',
          text1: 'Code Resent!',
          text2: 'A new verification code has been sent to your email.',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed to Resend',
        text2: error?.message ?? 'Something went wrong. Please try again.',
      });
    }
  };

  return {
    loading,
    countdown,
    handleChange,
    handleContinue,
    handleResend,
  };
}