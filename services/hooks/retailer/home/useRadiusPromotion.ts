import { useState } from 'react';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export const useRadiusPromotion = () => {
  const [radius, setRadius] = useState('5 miles');
  const [message, setMessage] = useState('');
  const [subMessage, setSubMessage] = useState('We\'re 1.2 miles away and ready for you!');

  // Mock data mapping radius to reach
  const reachMap: Record<string, string> = {
    '5 miles': '2,400',
    '10 miles': '8,500',
    '25 miles': '15,200',
  };

  const handleSend = () => {
    if (!message) {
      Toast.show({
        type: 'error',
        text1: 'Message Required',
        text2: 'Please enter a promotion message for your customers.',
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Promotion Sent! 📣',
      text2: `Sent to ~${reachMap[radius]} customers near you.`,
    });

    setTimeout(() => router.back(), 2000);
  };

  return {
    radius,
    setRadius,
    message,
    setMessage,
    subMessage,
    setSubMessage,
    customerCount: reachMap[radius],
    handleSend,
  };
};