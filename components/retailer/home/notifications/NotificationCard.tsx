import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const getTypeStyles = (type: string) => {
    switch (type) {
        case 'refund': return { bg: '#FFF5F5', border: '#FEB2B2', icon: 'arrow-left', iconBg: '#FED7D7', iconCol: '#C53030' };
        case 'alert': return { bg: '#FFFBEB', border: '#FDE68A', icon: 'alert-triangle', iconBg: 'transparent', iconCol: '#D97706' };
        default: return { bg: '#F0FFF4', border: '#C6F6D5', icon: 'shopping-bag', iconBg: '#DCFCE7', iconCol: '#166534' };
    }
};

export const NotificationCard = ({ item }: { item: any }) => {
    const styles = getTypeStyles(item.type);
    const router = useRouter();

    const handlePress = () => {
        if (item.type === 'refund') {
            router.push({
                pathname: '/screens/retailer/refund/refundClaimsScreen',
                params: {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                },
            });
        }
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
            <View style={[s.card, { backgroundColor: styles.bg, borderColor: styles.border }]}>
                <View style={s.header}>
                    <View style={[s.iconBox, { backgroundColor: styles.iconBg }]}>
                        <Feather name={styles.icon as any} size={16} color={styles.iconCol} />
                    </View>

                    <View style={s.content}>
                        <View style={s.topRow}>
                            <Text style={s.title}>{item.title}</Text>
                            <Text style={s.time}>{item.time}</Text>
                        </View>

                        <Text style={s.desc}>{item.description}</Text>

                        {item.deadline && (
                            <View style={s.deadlineBox}>
                                <Feather name="clock" size={12} color="#D97706" />
                                <Text style={s.deadlineText}>Respond by {item.deadline}</Text>
                            </View>
                        )}

                        <View style={s.actionRow}>
                            <TouchableOpacity style={s.btnMain}>
                                <Text style={s.btnTextMain}>View Order</Text>
                            </TouchableOpacity>

                            {item.type === 'order' && (
                                <TouchableOpacity style={s.btnSec}>
                                    <Text style={s.btnTextSec}>Mark Ready</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const s = StyleSheet.create({
    card: { borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1 },
    header: { flexDirection: 'row' },
    iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    content: { flex: 1, marginLeft: 12 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 14, fontWeight: '700', color: '#111' },
    time: { fontSize: 11, color: '#9CA3AF' },
    desc: { fontSize: 13, color: '#4B5563', marginTop: 4, lineHeight: 18 },
    deadlineBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', padding: 6, borderRadius: 6, marginTop: 8 },
    deadlineText: { fontSize: 11, fontWeight: '600', color: '#D97706', marginLeft: 4 },
    actionRow: { flexDirection: 'row', marginTop: 12, gap: 8 },
    btnMain: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB' },
    btnTextMain: { fontSize: 12, fontWeight: '600', color: '#111' },
    btnSec: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#111' },
    btnTextSec: { fontSize: 12, fontWeight: '600', color: '#fff' },
});