import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNotifications } from '@/services/hooks/retailer/home/useNotifications';
import { NotificationCard } from '@/components/retailer/home/notifications/NotificationCard';
import BaseContainer from '@/components/shared/BaseContainer';
const Filters = ['All', 'Orders', 'Refunds', 'Inventory'];

export default function NotificationsScreen() {
    const { activeFilter, setActiveFilter, filteredData } = useNotifications();

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='pt-10'>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <TouchableOpacity><Text style={styles.markRead}>Mark all read</Text></TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                    {Filters.map(f => (
                        <TouchableOpacity
                            key={f}
                            onPress={() => setActiveFilter(f)}
                            style={[styles.filterBtn, activeFilter === f && styles.activeFilter]}
                        >
                            <Text style={[styles.filterText, activeFilter === f && styles.activeFilterText]}>{f}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <ScrollView contentContainerStyle={styles.list}>
                    <Text style={styles.sectionHeader}>TODAY</Text>
                    {filteredData.map(item => <NotificationCard key={item.id} item={item} />)}
                </ScrollView>
            </View>
        </BaseContainer>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },
    header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '800' },
    markRead: { color: '#10B981', fontWeight: '600', fontSize: 14 },
    filterScroll: { paddingLeft: 20, marginVertical: 20, flexGrow: 0 },
    filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6', marginRight: 8 },
    activeFilter: { backgroundColor: '#111' },
    filterText: { fontSize: 13, fontWeight: '600', color: '#6B7280' },
    activeFilterText: { color: '#fff' },
    list: { paddingHorizontal: 20 },
    sectionHeader: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', marginBottom: 12, letterSpacing: 1 },
});