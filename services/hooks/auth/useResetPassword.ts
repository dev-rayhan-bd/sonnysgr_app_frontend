import { useState } from 'react';
import Toast from 'react-native-toast-message';

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordErrors {
  password?: string;
  confirmPassword?: string;
}

const getStrength = (password: string): number => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export function useResetPassword() {
  const [form, setForm] = useState<ResetPasswordForm>({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [loading, setLoading] = useState(false);
  const strength = getStrength(form.password);

  const updateField = (field: keyof ResetPasswordForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

const validate = (): boolean => {
  const newErrors: ResetPasswordErrors = {};

  if (!form.password.trim()) {
    newErrors.password = 'Password is required';
  } else if (form.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }

  if (!form.confirmPassword.trim()) {
    newErrors.confirmPassword = 'Please confirm your password';
  } else if (form.password !== form.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }

  setErrors(newErrors);

  // ✅ Return false if there are errors, but no toast
  return Object.keys(newErrors).length === 0;
};

  const handleSave = async (onSuccess?: () => void) => {
    if (!validate()) return;

    try {
      setLoading(true);

      // TODO: replace with your actual API call
      await new Promise(res => setTimeout(res, 1500));

      Toast.show({
        type: 'success',
        text1: 'Password Reset!',
        text2: 'Your password has been changed successfully.',
      });

      await new Promise(res => setTimeout(res, 500));
      onSuccess?.();

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Reset Failed',
        text2: error?.message ?? 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    strength,
    updateField,
    handleSave,
  };
}