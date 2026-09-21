import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

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
        category: '',
        colorway: '',
        sku: '',
        availability: 'Active' as 'Active' | 'Coming Soon',
    });

    const [sizes, setSizes] = useState<ProductSize[]>([]);
    const [scannedFound, setScannedFound] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    const updateField = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const updateSizeQty = (index: number, delta: number) => {
        setSizes(prev => {
            const next = [...prev];
            next[index] = { ...next[index], qty: Math.max(0, next[index].qty + delta) };
            return next;
        });
    };

    const addSize = () => {
        setSizes(prev => [...prev, { size: '', qty: 1, price: form.category ? '' : '', status: 'Active' }]);
    };

    const removeSize = (index: number) => {
        setSizes(prev => prev.filter((_, i) => i !== index));
    };

    // Simulates a barcode scan result filling the form automatically.
    const openScanner = () => {
        setIsScanning(true);
        setTimeout(() => {
            setForm({
                name: 'Air Jordan 1 Retro High OG "Black White"',
                brand: 'Jordan',
                category: 'Sneakers',
                colorway: 'Black/White',
                sku: 'DZ5485-010',
                availability: 'Active',
            });
            setSizes([{ size: '10.5', qty: 1, price: '220', status: 'Active' }]);
            setScannedFound(true);
            setIsScanning(false);

            Toast.show({
                type: 'success',
                text1: 'Barcode scanned',
                text2: 'Product details filled in automatically.',
                position: 'top',
            });
        }, 900);
    };

    const enterBarcodeManually = () => {
        // Hand off to a manual barcode-entry input/modal
        console.log('Enter barcode manually');
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

    return {
        form,
        sizes,
        scannedFound,
        isScanning,
        updateField,
        updateSizeQty,
        addSize,
        removeSize,
        setForm,
        openScanner,
        enterBarcodeManually,
        handleSave,
    };
};