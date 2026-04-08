import { useState } from 'react';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export type InventoryMode = 'shared' | 'separate';

export interface BranchForm {
  name: string;
  address: string;
  phone: string;
  acceptOrders: boolean;
  acceptDeposit: boolean;
  pickupAvailable: boolean;
}

export const useAddBranch = () => {
  const [form, setForm] = useState<BranchForm>({
    name: '',
    address: '',
    phone: '',
    acceptOrders: true,
    acceptDeposit: true,
    pickupAvailable: true,
  });

  const [inventoryMode, setInventoryMode] = useState<InventoryMode>('shared');

  const setField = <K extends keyof BranchForm>(key: K, value: BranchForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddPhoto = () => {
    Toast.show({ type: 'info', text1: 'Photo picker coming soon' });
  };

  const handleSetupCustomPickup = () => {
    router.push('/retailer/branch/pickup-rules');
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      Toast.show({ type: 'error', text1: 'Branch name is required' });
      return;
    }
    if (!form.address.trim()) {
      Toast.show({ type: 'error', text1: 'Address is required' });
      return;
    }
    // TODO: call API
    Toast.show({ type: 'success', text1: 'Branch saved!', text2: form.name });
    router.back();
  };

  return {
    form,
    setField,
    inventoryMode,
    setInventoryMode,
    handleSave,
    handleAddPhoto,
    handleSetupCustomPickup,
  };
};