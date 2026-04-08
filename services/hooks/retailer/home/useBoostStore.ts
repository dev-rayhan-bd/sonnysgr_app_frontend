import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useBoostStore = () => {
  const [currentPlan, setCurrentPlan] = useState('Free');

  const handleUpgrade = (planName: string) => {
    Toast.show({
      type: 'success',
      text1: 'Processing Upgrade',
      text2: `Redirecting to checkout for the ${planName} plan.`,
    });
  };

  const handleActivateBoost = (boostName: string) => {
    Toast.show({
      type: 'success',
      text1: 'Boost Activated!',
      text2: `${boostName} is now active for your store.`,
    });
  };

  return { currentPlan, handleUpgrade, handleActivateBoost };
};