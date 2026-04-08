import { useState } from 'react';
import { router } from 'expo-router';

export const useMakeOffer = () => {
  const [offerValue, setOfferValue] = useState('205');
  const [note, setNote] = useState('');
  const [expiry, setExpiry] = useState('24 hours');
  const [isSending, setIsSending] = useState(false);

  const marketData = {
    stockX: 240,
    goat: 235,
    gosnkr: 220,
  };

  // Calculate percentage difference vs StockX
  const diffFromStockX = Math.round(
    ((marketData.stockX - Number(offerValue)) / marketData.stockX) * 100
  );

  const handleSendOffer = () => {
    setIsSending(true);
    
    // Simulate a brief delay for a better UX feel
    setTimeout(() => {
      setIsSending(false);
      // Ensure this path matches your file structure for the success screen
      router.push('/screens/retailer/home/more/offerSuccessScreen');
    }, 600);
  };

  return {
    offerValue,
    setOfferValue,
    note,
    setNote,
    expiry,
    setExpiry,
    marketData,
    diffFromStockX,
    isSending,
    handleSendOffer,
  };
};