import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export type InventoryMode = 'shared' | 'separate';

export interface BranchForm {
  name: string;
  address: string;
  phone: string;
  photoUri: string;
  acceptOrders: boolean;
  acceptDeposit: boolean;
  pickupAvailable: boolean;
}

// Mock loader — replace with your real API / store call
const fetchBranch = async (id: string): Promise<BranchForm> => ({
  name: 'Main Street',
  address: '123 Ocean Drive, Miami, FL',
  phone: '+1 (305) 555-0198',
  photoUri: '',
  acceptOrders: true,
  acceptDeposit: true,
  pickupAvailable: true,
});

export const useEditBranch = (id: string) => {
  const [form, setForm] = useState<BranchForm>({
    name: '',
    address: '',
    phone: '',
    photoUri: '',
    acceptOrders: true,
    acceptDeposit: true,
    pickupAvailable: true,
  });

  const [inventoryMode, setInventoryMode] = useState<InventoryMode>('shared');

  useEffect(() => {
    fetchBranch(id).then(setForm);
  }, [id]);

  const setField = <K extends keyof BranchForm>(key: K, value: BranchForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangePhoto = () => {
    Toast.show({ type: 'info', text1: 'Photo picker coming soon' });
  };

  const handleSetupCustomPickup = () => {
    router.push(`/`);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      Toast.show({ type: 'error', text1: 'Branch name is required' });
      return;
    }
    // TODO: call update API
    Toast.show({ type: 'success', text1: 'Branch updated!', text2: form.name });
    router.back();
  };

  return {
    form,
    setField,
    inventoryMode,
    setInventoryMode,
    handleSave,
    handleChangePhoto,
    handleSetupCustomPickup,
  };
};