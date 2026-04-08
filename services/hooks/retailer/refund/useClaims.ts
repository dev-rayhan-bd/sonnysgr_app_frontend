import { useState, useCallback, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ClaimStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'auto_approved'
  | 'dismissed';

export type CancelledBy = 'store' | 'customer' | 'system';

export interface ClaimCustomer {
  id: string;
  name: string;
  avatarLabel: string;
  avatarColor: string;
  handle: string;
  totalPurchases: number;
  pastClaims: number;
  rating: number;
}

export interface ClaimOrder {
  productName: string;
  productBrand: string;
  size: string;
  gender: string;
  imageUri?: string;
  imageBg: string;
  holdPlacedAt: string;
  depositAmount: number;
  cancelledBy: CancelledBy;
  sku?: string;
}

export interface RefundClaim {
  id: string;
  claimNumber: string;
  status: ClaimStatus;
  reason: string;
  submittedAt: string;
  deadlineIso: string;
  deadlineDisplay: string;
  customer: ClaimCustomer;
  order: ClaimOrder;
}

// ─── Countdown hook ───────────────────────────────────────────────────────────

export const useCountdown = (deadlineIso: string) => {
  const calc = () => {
    const diff = new Date(deadlineIso).getTime() - Date.now();
    if (diff <= 0) return { h: '00', m: '00', s: '00', expired: true };
    const total = Math.floor(diff / 1000);
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return { h, m, s, expired: false };
  };

  const [remaining, setRemaining] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setRemaining(calc()), 1000);
    return () => clearInterval(id);
  }, [deadlineIso]);

  return remaining;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

const MOCK_CLAIMS: RefundClaim[] = [
  {
    id: 'claim-1',
    claimNumber: 'HF-00415',
    status: 'pending',
    reason: 'Store cancelled the hold',
    submittedAt: 'Apr 04, 2025 · 3:42 PM',
    deadlineIso: new Date(Date.now() + 22 * 3600 * 1000 + 46 * 60 * 1000).toISOString(),
    deadlineDisplay: 'Apr 05, 10:32 AM',
    customer: {
      id: 'cust-1',
      name: 'Sonny Garcia',
      avatarLabel: 'SG',
      avatarColor: '#00C853',
      handle: '@sonny · DJ1234Member',
      totalPurchases: 13,
      pastClaims: 0,
      rating: 4,
    },
    order: {
      productName: "Air Jordan 4 'Black Cat'",
      productBrand: 'JORDAN',
      size: '11.5',
      gender: "Men's",
      imageBg: '#1F2937',
      holdPlacedAt: 'Apr 04, 2025 · 10:30 AM',
      depositAmount: 44,
      cancelledBy: 'store',
    },
  },
];

export const useClaims = () => {
  const [claims, setClaims] = useState<RefundClaim[]>(MOCK_CLAIMS);
  const [isProcessing, setIsProcessing] = useState(false);

  const newClaims = claims.filter(c => c.status === 'pending');
  const previousClaims = claims.filter(c =>
    ['approved', 'rejected', 'auto_approved'].includes(c.status),
  );

  const updateStatus = useCallback(async (id: string, status: ClaimStatus) => {
    setIsProcessing(true);
    try {
      await new Promise(res => setTimeout(res, 800));
      setClaims(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleApproveClaim = useCallback(
    (id: string) => updateStatus(id, 'approved'), [updateStatus]);

  const handleRejectClaim = useCallback(
    (id: string) => updateStatus(id, 'rejected'), [updateStatus]);

  const handleDismiss = useCallback(
    (id: string) => updateStatus(id, 'dismissed'), [updateStatus]);

  const handleViewCustomerProfile = useCallback((customerId: string) => {
    console.log('view customer', customerId);
  }, []);

  return {
    newClaims,
    previousClaims,
    isProcessing,
    handleApproveClaim,
    handleRejectClaim,
    handleDismiss,
    handleViewCustomerProfile,
  };
};