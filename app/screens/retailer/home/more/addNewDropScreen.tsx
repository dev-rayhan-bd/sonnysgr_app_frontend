import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
// CHANGE THIS IMPORT:
import { useNewDrop } from '@/services/hooks/retailer/home/useNewDrop'; 
import BaseContainer from '@/components/shared/BaseContainer';

export default function AddNewDrop() {
    // Now using the correct hook for form state
    const { formData, updateField, handleCreateDrop } = useNewDrop();

    return (
        <BaseContainer backgroundColor='#fff'>
            <View className='pt-10 flex-1'>
                <View style={s.header}>
                    <TouchableOpacity onPress={() => router.back()}><Feather name="x" size={24} /></TouchableOpacity>
                    <Text style={s.headerTitle}>Create New Drop</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
                    <Text style={s.label}>Select Product</Text>
                    <TouchableOpacity style={s.inputBox}>
                        <Text style={{ color: '#9CA3AF' }}>Search your inventory...</Text>
                        <Feather name="search" size={18} color="#9CA3AF" />
                    </TouchableOpacity>

                    <Text style={s.label}>Drop Type</Text>
                    <View style={s.typeRow}>
                        {['Raffle', 'First Come', 'VIP Early'].map(type => (
                            <TouchableOpacity
                                key={type}
                                onPress={() => updateField('type', type)}
                                style={[s.typeTab, formData.type === type && s.typeTabActive]}
                            >
                                <Text style={[s.typeTabText, formData.type === type && s.typeTabTextActive]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={s.label}>Launch Date & Time</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity style={[s.inputBox, { flex: 1 }]}><Text style={s.placeholderText}>Select Date</Text></TouchableOpacity>
                        <TouchableOpacity style={[s.inputBox, { flex: 1 }]}><Text style={s.placeholderText}>Select Time</Text></TouchableOpacity>
                    </View>

                    <Text style={s.label}>Inventory Quantity</Text>
                    <TextInput
                        style={s.textInput}
                        placeholder="Number of pairs"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                        value={formData.quantity}
                        onChangeText={val => updateField('quantity', val)}
                    />

                    <View style={s.infoBox}>
                        <Feather name="info" size={16} color="#3B82F6" />
                        <Text style={s.infoText}>Gold+ members automatically get 1 hour early access.</Text>
                    </View>
                </ScrollView>

                {/* Footer fixed at bottom */}
                <View style={s.footer}>
                    <TouchableOpacity style={s.btn} onPress={handleCreateDrop}>
                        <Text style={s.btnText}>Schedule Drop</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BaseContainer>
    );
}

const s = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    headerTitle: { fontSize: 16, fontWeight: '800' },
    label: { fontSize: 13, fontWeight: '700', marginTop: 20, marginBottom: 8 },
    inputBox: { height: 50, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
    placeholderText: { color: '#9CA3AF' },
    typeRow: { flexDirection: 'row', gap: 8 },
    typeTab: { flex: 1, height: 40, borderRadius: 10, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
    typeTabActive: { backgroundColor: '#111' },
    typeTabText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
    typeTabTextActive: { color: '#fff' },
    textInput: { height: 50, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, color: '#111' },
    infoBox: { flexDirection: 'row', backgroundColor: '#EFF6FF', padding: 12, borderRadius: 12, marginTop: 20 },
    infoText: { flex: 1, color: '#1E40AF', fontSize: 12, marginLeft: 8 },
    footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#F3F4F6', backgroundColor: '#fff' },
    btn: { backgroundColor: '#111', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '700' }
});