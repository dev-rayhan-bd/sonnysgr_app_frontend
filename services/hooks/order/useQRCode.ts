// services/hooks/store/useQRCode.ts
import { useState, useEffect, useCallback } from 'react'

export function useQRCode(initialSeconds = 585) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [active,  setActive]  = useState(true)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    if (!active) return
    if (seconds <= 0) { setActive(false); return }
    const t = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [active, seconds])

  const minutes  = Math.floor(seconds / 60)
  const secs     = seconds % 60
  const display  = `${minutes}:${String(secs).padStart(2, '0')}`
  const progress = seconds / initialSeconds

  const refresh = useCallback(() => {
    setSeconds(initialSeconds)
    setActive(true)
    setScanned(false)
  }, [initialSeconds])

  const simulateScan = useCallback(() => {
    setActive(false)
    setScanned(true)
  }, [])

  return { display, progress, seconds, scanned, refresh, simulateScan }
}