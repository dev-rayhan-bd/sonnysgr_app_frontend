import { useState } from 'react';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export const useNewDrop = () => {
  const [formData, setFormData] = useState({
    product: '',
    type: 'Raffle',
    date: '',
    time: '',
    quantity: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateDrop = () => {
    if (!formData.quantity) {
      Toast.show({
        type: 'error',
        text1: 'Quantity Required',
        text2: 'Please specify how many pairs are available.',
      });
      return;
    }

    // Show the success toast
    Toast.show({
      type: 'success',
      text1: 'Drop Scheduled! 🚀',
      text2: `Your ${formData.type} drop is now active.`,
      visibilityTime: 2500,
    });

    // Delay the navigation slightly so the user sees the toast starting
    setTimeout(() => {
      router.back();
    }, 500); 
  };

  return { formData, updateField, handleCreateDrop };
};