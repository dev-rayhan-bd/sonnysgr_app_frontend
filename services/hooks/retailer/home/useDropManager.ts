import { useState, useEffect } from 'react';
import { router } from 'expo-router';

export const useDropManager = () => {
  // Active Drop Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });
  
  // New Drop Form State
  const [formData, setFormData] = useState({
    type: 'Raffle',
    quantity: '',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59, hours: prev.hours };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingDrops = [
    {
      id: '1',
      name: "Air Jordan 1 'Chicago'",
      type: 'RAFFLE',
      typeCol: '#8B5CF6',
      date: 'Sat Mar 29 - 10:00 AM',
      waiting: 47,
      timeLeft: '4d 12h',
    },
    {
      id: '2',
      name: "Nike Dunk Low 'Panda'",
      type: 'VIP EARLY',
      typeCol: '#F59E0B',
      date: 'Sun Mar 30 - 2:00 PM',
      waiting: 23,
      timeLeft: '5d 18h',
    }
  ];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateDrop = () => {
    console.log("Saving Drop:", formData);
    router.back();
  };

  return { timeLeft, upcomingDrops, formData, updateField, handleCreateDrop };
};