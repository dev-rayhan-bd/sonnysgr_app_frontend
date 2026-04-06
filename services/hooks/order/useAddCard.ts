// services/hooks/store/useAddCard.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export interface CardForm {
  number: string
  name: string
  expiry: string
  cvv: string
  saveCard: boolean
}

export function useAddCard() {
  const [form, setForm] = useState<CardForm>({
    number: '', name: '', expiry: '', cvv: '', saveCard: true,
  })

  const updateField = useCallback(<K extends keyof CardForm>(key: K, value: CardForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }

  const handleAddCard = useCallback(async (onSuccess: () => void) => {
    if (!form.number || !form.name || !form.expiry || !form.cvv) {
      Toast.show({ type: 'error', text1: 'Missing Fields', text2: 'Please fill in all card details' })
      return
    }
    await new Promise(r => setTimeout(r, 800))
    Toast.show({ type: 'success', text1: 'Card Added!', text2: 'Your card has been saved securely' })
    onSuccess()
  }, [form])

  return { form, updateField, formatCardNumber, formatExpiry, handleAddCard }
}