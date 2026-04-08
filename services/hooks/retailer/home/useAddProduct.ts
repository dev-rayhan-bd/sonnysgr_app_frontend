import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router'; // 1. Import the router

export interface ProductSize {
    size: string;
    qty: number;
    price: string;
    status: 'Active' | 'Inactive';
}

export const useAddProduct = () => {
    const [form, setForm] = useState({
        name: '',
        brand: '',
        colorway: '',
        sku: '',
        availability: 'Active' as const,
    });

    const [sizes, setSizes] = useState<ProductSize[]>([
        { size: '8', qty: 0, price: '220', status: 'Active' },
        { size: '8.5', qty: 0, price: '220', status: 'Active' },
    ]);

    const updateField = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const updateSizeQty = (index: number, delta: number) => {
        const newSizes = [...sizes];
        newSizes[index].qty = Math.max(0, newSizes[index].qty + delta);
        setSizes(newSizes);
    };

    const handleSave = () => {
        if (!form.name) {
            Toast.show({
                type: 'error',
                text1: 'Missing Information',
                text2: 'Please enter a product name. ⚠️',
                position: 'top',
            });
            return;
        }

        // Logic to save to your database would go here
        console.log('Saving Product:', { ...form, sizes });

        // 2. Show Success Toast
        Toast.show({
            type: 'success',
            text1: 'Product Saved!',
            text2: `${form.name} added successfully.`,
            position: 'top',
        });

        setTimeout(() => {
            router.back();
        }, 600);
    };

    return { form, sizes, updateField, updateSizeQty, setForm, handleSave };
};