import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ProductHeader from '@/components/retailer/home/addproduct/productHeader';
import ProductBarcodeScan from '@/components/retailer/home/addproduct/productBarcodeScan';
import OrDivider from '@/components/retailer/home/addproduct/orDivider';
import ProductImageUpload from '@/components/retailer/home/addproduct/productImageUpload';
import ProductFoundCard from '@/components/retailer/home/addproduct/productFoundCard';
import ProductSizeTable from '@/components/retailer/home/addproduct/productSizeTable';
import { useAddProduct } from '@/services/hooks/retailer/home/useAddProduct';
import BaseContainer from '@/components/shared/BaseContainer';

interface InputFieldProps {
    placeholder: string;
    value: string;
    onChangeText: (v: string) => void;
}

const InputField = ({ placeholder, value, onChangeText }: InputFieldProps) => (
    <View style={styles.inputWrapper}>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#9CA3AF"
            autoCorrect={false}
            underlineColorAndroid="transparent"
        />
    </View>
);

const AddProductScreen = () => {
    const {
        form,
        sizes,
        scannedFound,
        updateField,
        updateSizeQty,
        addSize,
        removeSize,
        openScanner,
        enterBarcodeManually,
        handleSave,
    } = useAddProduct();

    return (
        <BaseContainer backgroundColor='#fff'>
            <View style={styles.container}>
                <ProductHeader />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    <ProductBarcodeScan
                        onOpenScanner={openScanner}
                        onEnterManually={enterBarcodeManually}
                    />

                    <OrDivider />

                    <ProductImageUpload />

                    {scannedFound && <ProductFoundCard productName={form.name} />}

                    <Text style={styles.sectionLabel}>PRODUCT DETAILS</Text>

                    <InputField
                        placeholder="Product Name"
                        value={form.name}
                        onChangeText={(v) => updateField('name', v)}
                    />
                    <InputField
                        placeholder="Brand"
                        value={form.brand}
                        onChangeText={(v) => updateField('brand', v)}
                    />
                    <InputField
                        placeholder="Category"
                        value={form.category}
                        onChangeText={(v) => updateField('category', v)}
                    />
                    <InputField
                        placeholder="Colorway"
                        value={form.colorway}
                        onChangeText={(v) => updateField('colorway', v)}
                    />
                    <InputField
                        placeholder="SKU / Style Code"
                        value={form.sku}
                        onChangeText={(v) => updateField('sku', v)}
                    />

                    <Text style={styles.sectionLabel}>SIZES & PRICING</Text>
                    <ProductSizeTable
                        sizes={sizes}
                        onUpdateQty={updateSizeQty}
                        onRemove={removeSize}
                        onAddSize={addSize}
                    />

                    <Text style={styles.sectionLabel}>AVAILABILITY</Text>
                    <View style={styles.availabilityRow}>
                        {(['Active', 'Coming Soon'] as const).map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[
                                    styles.availabilityItem,
                                    form.availability === status && styles.activeItem
                                ]}
                                onPress={() => updateField('availability', status)}
                            >
                                <Text style={[
                                    styles.availabilityText,
                                    form.availability === status && styles.activeAvailabilityText
                                ]}>
                                    {status} {form.availability === status && '✓'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={styles.saveBtnText}>Save Product</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </BaseContainer>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 40 },
    scrollContent: { paddingBottom: 100 },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#9CA3AF',
        marginLeft: 20,
        marginTop: 24,
        marginBottom: 8,
        letterSpacing: 1
    },
    inputWrapper: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        paddingHorizontal: 16
    },
    input: {
        height: 50,
        fontSize: 15,
        fontWeight: '500',
        color: '#111'
    },
    availabilityRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
    },
    availabilityItem: {
        flex: 1,
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F3F4F6'
    },
    activeItem: {
        borderColor: '#22C55E',
        backgroundColor: '#F0FDF4'
    },
    availabilityText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#4B5563'
    },
    activeAvailabilityText: {
        color: '#22C55E'
    },
    saveBtn: {
        backgroundColor: '#111',
        margin: 16,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32
    },
    saveBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800'
    },
});

export default AddProductScreen;