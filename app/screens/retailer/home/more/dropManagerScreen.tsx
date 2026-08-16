import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDropManager } from '@/services/hooks/retailer/home/useDropManager';
import BaseContainer from '@/components/shared/BaseContainer';
export default function DropManagerScreen() {
    const { timeLeft, upcomingDrops } = useDropManager();

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='pt-10'>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} /></TouchableOpacity>
                    <Text style={styles.headerTitle}>Drop Manager</Text>
                    <TouchableOpacity style={styles.newDropBtn} onPress={() => router.push('/screens/retailer/home/more/addNewDropScreen')}>
                        <Text style={styles.newDropText}>+ New Drop</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scroll}>
                    {/* Active Drop Card */}
                    <View style={styles.blackCard}>
                        <Text style={styles.statusText}>DROP IN PROGRESS 🔥</Text>
                        <View style={styles.shoeCircle}>
                            <Feather name="box" size={40} color="#333" />
                        </View>
                        <Text style={styles.shoeName}>Air Jordan 4 'Black Cat'</Text>
                        <Text style={styles.timer}>
                            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                        </Text>
                        <Text style={styles.timerSub}>Until drop goes live</Text>

                        <View style={styles.statsRow}>
                            <View style={styles.statItem}><Text style={styles.statNum}>47</Text><Text style={styles.statLab}>waitlisted</Text></View>
                            <View style={styles.statItem}><Text style={[styles.statNum, { color: '#F59E0B' }]}>Gold+</Text><Text style={styles.statLab}>VIP only 1hr</Text></View>
                            <View style={styles.statItem}><Text style={styles.statNum}>12</Text><Text style={styles.statLab}>available</Text></View>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Upcoming Drops</Text>
                    {upcomingDrops.map(drop => (
                        <View key={drop.id} style={styles.upcomingCard}>
                            <View style={styles.imgPlaceholder} />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <View style={[styles.typeBadge, { backgroundColor: drop.typeCol + '20' }]}>
                                    <Text style={[styles.typeText, { color: drop.typeCol }]}>{drop.type}</Text>
                                </View>
                                <Text style={styles.dropName}>{drop.name}</Text>
                                <Text style={styles.dropSub}><Feather name="calendar" size={12} /> {drop.date}</Text>
                            </View>
                            <View style={styles.rightInfo}>
                                <Text style={styles.timeTag}>{drop.timeLeft}</Text>
                                <TouchableOpacity onPress={() => router.push('/screens/retailer/home/more/editDropScreen')}>
  <Feather name="more-vertical" size={20} color="#D1D5DB" />
</TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </BaseContainer>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center', backgroundColor: '#fff' },
    headerTitle: { fontSize: 18, fontWeight: '900' },
    newDropBtn: { backgroundColor: '#FFED4A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
    newDropText: { fontSize: 12, fontWeight: '800' },
    scroll: { padding: 16 },
    blackCard: { backgroundColor: '#111', borderRadius: 24, padding: 24, alignItems: 'center' },
    statusText: { color: '#10B981', fontSize: 10, fontWeight: '900' },
    shoeCircle: { width: 80, height: 80, backgroundColor: '#1A1A1A', borderRadius: 40, marginVertical: 20, alignItems: 'center', justifyContent: 'center' },
    shoeName: { color: '#fff', fontSize: 18, fontWeight: '700' },
    timer: { color: '#fff', fontSize: 44, fontWeight: '900', marginTop: 4 },
    timerSub: { color: '#6B7280', fontSize: 12 },
    statsRow: { flexDirection: 'row', width: '100%', marginTop: 24, borderTopWidth: 1, borderTopColor: '#222', paddingTop: 20 },
    statItem: { alignItems: 'center', flex: 1 },
    statNum: { color: '#fff', fontSize: 18, fontWeight: '800' },
    statLab: { color: '#4B5563', fontSize: 10 },
    sectionTitle: { fontSize: 18, fontWeight: '900', marginTop: 24, marginBottom: 16 },
    upcomingCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, flexDirection: 'row' },
    imgPlaceholder: { width: 50, height: 50, backgroundColor: '#F9FAFB', borderRadius: 12 },
    typeBadge: { alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    typeText: { fontSize: 9, fontWeight: '900' },
    dropName: { fontSize: 14, fontWeight: '700', marginTop: 4 },
    dropSub: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
    rightInfo: { alignItems: 'flex-end', justifyContent: 'space-between' },
    timeTag: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 10, fontWeight: '700' }
});