import { useCallback } from 'react'
import { useRouter } from 'expo-router'

export interface DealConfirmedParams {
  shoeName: string
  agreedPrice: number
  buyerName: string
}

export const NEXT_STEPS = [
  'Store will contact you via in-app message',
  'Bring or ship your pair to the location',
  'Payment on handoff — or use in-app transfer',
]

export function useDealConfirmed(params: DealConfirmedParams) {
  const router = useRouter()

  const handleViewTransaction = useCallback(() => {
    router.push('/screens/profile/mySalesScreen')
  }, [router])

  return {
    ...params,
    handleViewTransaction,
  }
}