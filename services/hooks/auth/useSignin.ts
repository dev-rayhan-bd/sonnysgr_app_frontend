import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { useRouter } from 'expo-router'

interface SigninForm {
  email: string
  password: string
}

interface SigninErrors {
  email?: string
  password?: string
}

type UserRole = 'retailer' | 'buyer' | 'reseller'

export function useSignin() {
  const router = useRouter()

  const [form, setForm] = useState<SigninForm>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<SigninErrors>({})
  const [loading, setLoading] = useState(false)

  const updateField = (field: keyof SigninForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: SigninErrors = {}
    const email = form.email.trim()

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

  /**
   * TEMP role resolver (replace with backend later)
   */
  const resolveRole = (email: string): UserRole => {
    const normalizedEmail = email.trim().toLowerCase()

    if (normalizedEmail === 'retailer@gmail.com') return 'retailer'
    if (normalizedEmail === 'reseller@gmail.com') return 'reseller'
    return 'buyer'
  }

  const redirectByRole = (role: UserRole) => {
    console.log(role)
    switch (role) {
      case 'retailer':
        router.replace('/retailerTabs/home')
        break
      case 'reseller':
        router.replace('/resellerTabs/dashboard')
        break
      case 'buyer':
      default:
        router.replace('/tabs/discoverScreen')
        break
    }
  }

  const handleSignin = async () => {
    if (!validate()) return

    try {
      setLoading(true)

      // simulate API
      await new Promise(res => setTimeout(res, 800))

      const role = resolveRole(form.email)

      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
        text2: `Logged in as ${role}`,
      })

      redirectByRole(role)
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Sign in failed',
        text2:
          error?.message ??
          'Please check your credentials and try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFaceID = async () => {
    try {
      setLoading(true)

      await new Promise(res => setTimeout(res, 600))

      // assume retailer for demo
      const role: UserRole = 'retailer'

      Toast.show({
        type: 'success',
        text1: 'Face ID successful',
      })

      redirectByRole(role)
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
