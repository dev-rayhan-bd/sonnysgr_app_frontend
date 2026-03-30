// hooks/auth/useCreateAccount.ts
import { useState } from 'react'
import Toast from 'react-native-toast-message'

interface CreateAccountForm {
  fullName:        string
  email:           string
  password:        string
  confirmPassword: string
  accountType:     string | null
  agreed:          boolean
}

interface CreateAccountErrors {
  fullName?:        string
  email?:           string
  password?:        string
  confirmPassword?: string
  accountType?:     string
  agreed?:          string
}

const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])/

export function useCreateAccount() {
  const [form, setForm] = useState<CreateAccountForm>({
    fullName:        '',
    email:           '',
    password:        '',
    confirmPassword: '',
    accountType:     null,
    agreed:          false,
  })

  const [errors, setErrors] = useState<CreateAccountErrors>({})
  const [loading, setLoading] = useState(false)

  const updateField = (
    field: keyof CreateAccountForm,
    value: string | boolean | null,
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear the error for this field as the user edits it
    if (errors[field as keyof CreateAccountErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const e: CreateAccountErrors = {}

    // ── Full Name ──────────────────────────────────────────
    if (!form.fullName.trim()) {
      e.fullName = 'Full name is required'
    } else if (form.fullName.trim().length < 2) {
      e.fullName = 'Full name must be at least 2 characters'
    } else if (form.fullName.trim().length > 60) {
      e.fullName = 'Full name must be under 60 characters'
    } else if (!/^[a-zA-Z\s'-]+$/.test(form.fullName.trim())) {
      e.fullName = 'Full name can only contain letters, spaces, hyphens and apostrophes'
    }

    // ── Email ──────────────────────────────────────────────
    if (!form.email.trim()) {
      e.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = 'Enter a valid email address'
    }

    // ── Account Type ───────────────────────────────────────
    if (!form.accountType) {
      e.accountType = 'Please select an account type'
    }

    // ── Password ───────────────────────────────────────────
    if (!form.password) {
      e.password = 'Password is required'
    } else if (form.password.length < 8) {
      e.password = 'Password must be at least 8 characters'
    } else if (form.password.length > 72) {
      e.password = 'Password must be under 72 characters'
    } else if (!PASSWORD_REGEX.test(form.password)) {
      e.password =
        'Password must include uppercase, lowercase, a number and a special character'
    }

    // ── Confirm Password ───────────────────────────────────
    if (!form.confirmPassword) {
      e.confirmPassword = 'Please confirm your password'
    } else if (form.confirmPassword !== form.password) {
      e.confirmPassword = 'Passwords do not match'
    }

    // ── Terms ──────────────────────────────────────────────
    if (!form.agreed) {
      e.agreed = 'You must accept the Terms & Conditions to continue'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleCreateAccount = async (onSuccess?: () => void) => {
    if (!validate()) return

    try {
      setLoading(true)

      // TODO: replace with real API call
      console.log('CreateAccount data:', form)
      await new Promise(res => setTimeout(res, 800))

      Toast.show({
        type:  'success',
        text1: 'Account Created!',
        text2: `Welcome, ${form.fullName.trim()}!`,
      })

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

  return { form, errors, loading, updateField, handleCreateAccount }
}