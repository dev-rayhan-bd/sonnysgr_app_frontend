// hooks/profile/useChangePassword.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export interface ChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordErrors {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}

export const useChangePassword = () => {
  const [form, setForm] = useState<ChangePasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<ChangePasswordErrors>({})
  const [loading, setLoading] = useState(false)
  const [showCurrent, setShowCurrent]   = useState(false)
  const [showNew, setShowNew]           = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)

  const updateField = useCallback(
    (field: keyof ChangePasswordForm, value: string) => {
      setForm(prev => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
    },
    [errors]
  )

  const validate = (): boolean => {
    const newErrors: ChangePasswordErrors = {}

    if (!form.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }

    if (!form.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = useCallback(
    async (onSuccess?: () => void) => {
      if (!validate()) return

      try {
        setLoading(true)
        // TODO: replace with real API call
        await new Promise(res => setTimeout(res, 800))

        Toast.show({
          type: 'success',
          text1: 'Password changed!',
          text2: 'Your password has been updated.',
          position: 'top',
          topOffset: 56,
        })

        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        onSuccess?.()
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Change failed',
          text2: error?.message ?? 'Please try again.',
          position: 'top',
          topOffset: 56,
        })
      } finally {
        setLoading(false)
      }
    },
    [form]
  )

  return {
    form,
    errors,
    loading,
    showCurrent,
    showNew,
    showConfirm,
    setShowCurrent,
    setShowNew,
    setShowConfirm,
    updateField,
    handleSave,
  }
}