import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export interface PrivacySettings {
  profileVisibility: boolean
  wishlist: boolean
  purchaseHistory: boolean
  lockerCollection: boolean
  vipStatus: boolean
  activity: boolean
}

export interface EditProfileForm {
  username: string
  fullName: string
  email: string
  bio: string
  privacy: PrivacySettings
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
  privacy: {
    profileVisibility: true,
    wishlist: true,
    purchaseHistory: false,
    lockerCollection: true,
    vipStatus: true,
    activity: false,
  }
}

export const useEditProfile = () => {
  const [form, setForm] = useState<EditProfileForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<EditProfileErrors>({})
  const [loading, setLoading] = useState(false)

  const updateField = useCallback(
    (field: keyof Omit<EditProfileForm, 'privacy'>, value: string) => {
      setForm(prev => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
    },
    [errors]
  )

const updatePrivacy = useCallback((field: keyof PrivacySettings, label: string) => {
    setForm(prev => {
      const newValue = !prev.privacy[field];
      Toast.show({
        type: 'success',
        text1: `${label} Updated`,
        text2: `Setting changed to ${newValue ? 'Public' : 'Private'}`,
        position: 'top', // Bottom is usually better for small toggles
        bottomOffset: 100,
        visibilityTime: 2000,
      });

      return {
        ...prev,
        privacy: {
          ...prev.privacy,
          [field]: newValue
        }
      };
    });
  }, []);

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
    console.log('Change profile photo')
  }, [])

  return {
    form,
    errors,
    loading,
    updateField,
    updatePrivacy,
    handleSave,
    handleChangePhoto,
  }
}