import { useState } from 'react';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export interface PickupRules {
  pickupWindowHours: number;
  autoRefundDeposit: boolean;
  sendReminder: boolean;
  autoRestock: boolean;
  blackoutDays: string[];
  instructions: string;
}

export const windowOptions = [
  { label: '24 hrs', value: 24 },
  { label: '48 hrs', value: 48 },
  { label: '72 hrs', value: 72 },
  { label: '1 week', value: 168 },
];

export const usePickupRules = () => {
  const [rules, setRules] = useState<PickupRules>({
    pickupWindowHours: 48,
    autoRefundDeposit: true,
    sendReminder: true,
    autoRestock: true,
    blackoutDays: [],
    instructions: '',
  });

  const setField = <K extends keyof PickupRules>(key: K, value: PickupRules[K]) => {
    setRules((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: persist to API / store
    Toast.show({ type: 'success', text1: 'Pickup rules saved!' });
    router.back();
  };

  return { rules, setField, windowOptions, handleSave };
};