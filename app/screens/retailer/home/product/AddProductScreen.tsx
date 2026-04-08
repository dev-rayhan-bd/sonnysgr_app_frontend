import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ProductHeader from '@/components/retailer/home/addproduct/productHeader';
import ProductImageUpload from '@/components/retailer/home/addproduct/productImageUpload';
import ProductSizeTable from '@/components/retailer/home/addproduct/productSizeTable';
import { useAddProduct } from '@/services/hooks/retailer/home/useAddProduct';
import BaseContainer from '@/components/shared/BaseContainer';

/**
 * 1. FIXED: Component moved OUTSIDE of the main screen to prevent 
 * keyboard dismissal on every keystroke.
 */
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
            // Add this to ensure it's easy to tap on Android
            underlineColorAndroid="transparent"
        />
    </View>
);


const AddProductScreen = () => {
    const { form, sizes, updateField, updateSizeQty, handleSave } = useAddProduct();

    return (
        <BaseContainer backgroundColor='#fff'>
            <View style={styles.container}>
                <ProductHeader />
                
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    /**
                     * 2. FIXED: Added keyboardShouldPersistTaps so tapping 
                     * buttons doesn't immediately hide the keyboard.
                     */
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    <ProductImageUpload />

                    <Text style={styles.sectionLabel}>PRODUCT DETAILS</Text>
                    
                    <InputField 
                        placeholder="Shoe Name" 
                        value={form.name} 
                        onChangeText={(v) => updateField('name', v)} 
                    />
                    <InputField 
                        placeholder="Brand" 
                        value={form.brand} 
                        onChangeText={(v) => updateField('brand', v)} 
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
                    <ProductSizeTable sizes={sizes} onUpdateQty={updateSizeQty} />

                    <Text style={styles.sectionLabel}>AVAILABILITY</Text>
                    <View style={styles.grid}>
                        {['Active', 'On Hold', 'Sold Out', 'Coming Soon'].map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[
                                    styles.gridItem, 
                                    form.availability === status && styles.activeItem
                                ]}
                                onPress={() => updateField('availability', status)}
                            >
                                <Text style={[
                                    styles.gridText, 
                                    form.availability === status && styles.activeGridText
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
    container: { flex: 1, paddingTop: 40 }, // Using paddingTop instead of className for stability
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
    grid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        paddingHorizontal: 12 
    },
    gridItem: { 
        width: '44%', 
        backgroundColor: '#fff', 
        margin: '3%', 
        height: 50, 
        borderRadius: 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#F3F4F6' 
    },
    activeItem: { 
        borderColor: '#22C55E', 
        backgroundColor: '#F0FDF4' 
    },
    gridText: { 
        fontSize: 13, 
        fontWeight: '600', 
        color: '#4B5563' 
    },
    activeGridText: { 
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