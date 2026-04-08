import { useState, useEffect } from 'react';

export const useOfferSuccess = () => {
  const [timeLeft, setTimeLeft] = useState('23:45:18');

  // Placeholder for countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      // In a real app, you'd calculate the diff between now and expiry date
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWithdraw = () => {
    console.log("Offer withdrawn");
  };

  return {
    timeLeft,
    handleWithdraw,
    offerDetails: {
      amount: '$205',
      seller: '@sonnysgr',
      item: "Jordan 4 DS"
    }
  };
};