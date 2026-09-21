import { useMemo, useState } from 'react';
import { router } from 'expo-router';

const QUICK_OFFERS = ['185', '195', '200', '210', '215'];
const EXPIRY_OPTIONS = ['24 hours', '48 hours', '72 hours'];

export const useMakeOffer = () => {
  const [offerValue, setOfferValue] = useState('205');
  const [note, setNote] = useState('');
  const [expiry, setExpiry] = useState('24 hours');
  const [isSending, setIsSending] = useState(false);

  const item = {
    name: "Air Jordan 4 'Black Cat'",
    subtitle: "Men's US 10.5 · New / Deadstock",
    seller: {
      initials: 'SL',
      name: "Sonny's Locker",
      verified: true,
      rating: '4.9',
      completedSales: 126,
    },
    verifiedNote: 'Listing verified today',
    shipFromTo: 'Ship to Sonny\'s Kicks · Miami',
  };

  const marketContext = {
    sizeLabel: '10.5',
    updatedAgo: '5 min ago',
    recentMarketSale: 240,
    thirtyDayAverage: 235,
    goSnkrAskingAverage: 220,
    suggestedRangeLow: 195,
    suggestedRangeHigh: 215,
  };

  const costBreakdown = useMemo(() => {
    const offer = Number(offerValue) || 0;
    const buyerProtectionFee = 8;
    const shippingToYou = 12;
    const totalLandedCost = offer + buyerProtectionFee + shippingToYou;
    const expectedStorePrice = 260;
    const projectedProfit = expectedStorePrice - totalLandedCost;
    const marginPct = expectedStorePrice > 0 ? (projectedProfit / expectedStorePrice) * 100 : 0;

    return {
      offer,
      buyerProtectionFee,
      shippingToYou,
      totalLandedCost,
      expectedStorePrice,
      projectedProfit,
      marginPct,
    };
  }, [offerValue]);

  const handleReviewOffer = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      router.push('/screens/retailer/home/more/offerSuccessScreen');
    }, 600);
  };

  return {
    item,
    marketContext,
    quickOffers: QUICK_OFFERS,
    offerValue,
    setOfferValue,
    note,
    setNote,
    expiryOptions: EXPIRY_OPTIONS,
    expiry,
    setExpiry,
    costBreakdown,
    isSending,
    handleReviewOffer,
  };
};