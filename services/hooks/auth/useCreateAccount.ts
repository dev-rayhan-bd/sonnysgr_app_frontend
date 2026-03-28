// hooks/auth/useCreateAccount.ts
import { useState } from 'react'
import Toast from 'react-native-toast-message'

interface CreateAccountForm {
  fullName:        string
  email:           string
  password:        string
  confirmPassword: string
  agreed:          boolean
}

export function useCreateAccount() {
  const [form, setForm] = useState<CreateAccountForm>({
    fullName:        '',
    email:           '',
    password:        '',
    confirmPassword: '',
    agreed:          false,
  })

  const [loading, setLoading] = useState(false)

  const updateField = (
    field: keyof CreateAccountForm,
    value: string | boolean | null,
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateAccount = async (onSuccess?: () => void) => {
    try {
      setLoading(true)

      console.log('CreateAccount data:', form)

      Toast.show({
        type:  'success',
        text1: 'Account Created!',
        text2: `Welcome, ${form.fullName || 'User'}!`,
      })

      await new Promise(res => setTimeout(res, 500))
      onSuccess?.()
    } catch (error: any) {
      Toast.show({
        type:  'error',
        text1: 'Something went wrong',
        text2: error?.message ?? 'Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return { form, errors: {}, loading, updateField, handleCreateAccount }
}