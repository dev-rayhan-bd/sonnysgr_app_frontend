// hooks/auth/useSignin.ts
import { useState } from 'react'
import Toast from 'react-native-toast-message'

interface SigninForm {
  email: string
  password: string
}

interface SigninErrors {
  email?: string
  password?: string
}

export function useSignin() {
  const [form, setForm] = useState<SigninForm>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<SigninErrors>({})
  const [loading, setLoading] = useState(false)

  const updateField = (field: keyof SigninForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear error for field as user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: SigninErrors = {}

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignin = async (onSuccess?: () => void) => {
    if (!validate()) return

    try {
      setLoading(true)

      // TODO: replace with real auth call
      console.log('Signin data:', form)
      await new Promise(res => setTimeout(res, 800))

      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
        text2: `Signed in as ${form.email}`,
      })

      onSuccess?.()
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Sign in failed',
        text2: error?.message ?? 'Please check your credentials and try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFaceID = async (onSuccess?: () => void) => {
    try {
      setLoading(true)

      // TODO: integrate expo-local-authentication
      console.log('Face ID auth triggered')
      await new Promise(res => setTimeout(res, 600))

      Toast.show({
        type: 'success',
        text1: 'Face ID successful',
      })

      onSuccess?.()
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Face ID failed',
        text2: error?.message ?? 'Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    form,
    errors,
    loading,
    updateField,
    handleSignin,
    handleFaceID,
  }
}