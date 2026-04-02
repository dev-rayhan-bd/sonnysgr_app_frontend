// hooks/profile/useEditProfile.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export interface EditProfileForm {
  username: string
  fullName: string
  email: string
  bio: string
}

export interface EditProfileErrors {
  username?: string
  fullName?: string
  email?: string
  bio?: string
}

const INITIAL_FORM: EditProfileForm = {
  username: 'sonnysgr',
  fullName: 'Sonny Garcia',
  email: 'sonny@example.com',
  bio: '',
}

export const useEditProfile = () => {
  const [form, setForm] = useState<EditProfileForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<EditProfileErrors>({})
  const [loading, setLoading] = useState(false)

  const updateField = useCallback(
    (field: keyof EditProfileForm, value: string) => {
      setForm(prev => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
    },
    [errors]
  )

  const validate = (): boolean => {
    const newErrors: EditProfileErrors = {}

    if (!form.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (form.username.length > 20) {
      newErrors.username = 'Max 20 characters'
    }

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }

    if (form.bio.length > 150) {
      newErrors.bio = 'Max 150 characters'
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
          text1: 'Profile updated!',
          text2: 'Your changes have been saved.',
          position: 'top',
          topOffset: 56,
        })

        onSuccess?.()
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Update failed',
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

  const handleChangePhoto = useCallback(() => {
    // TODO: integrate expo-image-picker
    console.log('Change profile photo')
  }, [])

  return {
    form,
    errors,
    loading,
    updateField,
    handleSave,
    handleChangePhoto,
  }
}