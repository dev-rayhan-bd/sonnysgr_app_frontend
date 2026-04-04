// services/hooks/discover/useSetDropReminder.ts
import { useState, useCallback } from 'react'

export interface DropRelease {
  id: string
  brand: string
  name: string
  dropTime: string        // e.g. "Drops at 10:00 AM"
  imageUri?: string
}

export function useSetDropReminder() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)   // 'YYYY-MM-DD'
  const [reminderSet, setReminderSet]   = useState(false)
  const [loading, setLoading]           = useState(false)

  const selectDate = useCallback((date: string) => {
    setSelectedDate(date)
    setReminderSet(false)
  }, [])

  const setReminder = useCallback(async () => {
    if (!selectedDate) return false
    setLoading(true)
    // Replace with your real API / notification scheduling call
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    setReminderSet(true)
    return true
  }, [selectedDate])

  const reset = useCallback(() => {
    setSelectedDate(null)
    setReminderSet(false)
  }, [])

  return { selectedDate, reminderSet, loading, selectDate, setReminder, reset }
}