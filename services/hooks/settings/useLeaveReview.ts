import { useState, useCallback } from 'react';
import Toast from 'react-native-toast-message';

export interface ReviewRatings {
  overall: number;
  customerService: number;
  authenticity: number;
  pricing: number;
  storeExperience: number;
  staffHelpfulness: number;
  pickupSpeed: number;
}

export const useLeaveReview = () => {
  const [ratings, setRatings] = useState<ReviewRatings>({
    overall: 0,
    customerService: 0,
    authenticity: 0,
    pricing: 0,
    storeExperience: 0,
    staffHelpfulness: 0,
    pickupSpeed: 0,
  });
  const [experience, setExperience] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateRating = (category: keyof ReviewRatings, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (onSuccess: () => void) => {
    if (ratings.overall === 0) {
      Toast.show({ type: 'error', text1: 'Please provide an overall rating' });
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      Toast.show({ type: 'success', text1: 'Review submitted successfully!' });
      onSuccess();
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed to submit review' });
    } finally {
      setLoading(false);
    }
  };

  return {
    ratings,
    experience,
    setExperience,
    isAnonymous,
    setIsAnonymous,
    updateRating,
    handleSubmit,
    loading,
  };
};