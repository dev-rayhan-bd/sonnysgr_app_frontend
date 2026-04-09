import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BaseContainer from '@/components/shared/BaseContainer';
import { useNotifications } from '@/services/hooks/reseller/dashboard/useNotifications';

const Notifications = () => {
    const { sections, activeTab, setActiveTab } = useNotifications();

    return (
        <BaseContainer backgroundColor='#fff'>
            <View className='pt-10 pb-20'>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <TouchableOpacity>
                        <Text style={styles.markReadText}>Mark all read</Text>
                    </TouchableOpacity>
                </View>

                {/* Filter Tabs */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabScroll}
                    style={styles.tabScrollView}
                >
                    {['All 4', 'Requests 1', 'Deals 2', 'Alerts 1'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='pb-20'>
                        {sections.map((section) => (
                            <View key={section.title}>
                                <Text style={styles.sectionTitle}>{section.title}</Text>
                                {section.data.map((item) => (
                                    <View
                                        key={item.id}
                                        style={[
                                            styles.notificationCard,
                                            { backgroundColor: item.bgColor, borderLeftColor: item.color }
                                        ]}
                                    >
                                        <View style={styles.cardHeader}>
                                            <View style={styles.iconRow}>
                                                <View style={[styles.avatarPlaceholder, { backgroundColor: `${item.color}20` }]}>
                                                    {item.initials ? (
                                                        <Text style={{ color: item.color, fontWeight: 'bold' }}>{item.initials}</Text>
                                                    ) : (
                                                        <Ionicons name={item.icon as any} size={20} color={item.color} />
                                                    )}
                                                    <View style={[styles.statusDot, { backgroundColor: item.color }]} />
                                                </View>
                                                <View style={styles.titleContainer}>
                                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                                    <Text style={styles.timeText}>{item.time}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <Text style={styles.description}>{item.description}</Text>

                                        {item.actions && (
                                            <View style={styles.actionRow}>
                                                {item.actions.map((action, idx) => (
                                                    <TouchableOpacity
                                                        key={idx}
                                                        style={[
                                                            styles.actionBtn,
                                                            action.includes('Accept') ? styles.primaryAction : styles.secondaryAction,
                                                            action === 'Decline' && styles.dangerAction
                                                        ]}
                                                    >
                                                        <Text style={[
                                                            styles.actionBtnText,
                                                            action.includes('Accept') && { color: '#FFF' },
                                                            action === 'Decline' && { color: '#EF4444' }
                                                        ]}>
                                                            {action}{action.includes('View') ? '' : ''}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </BaseContainer>
    );
};

const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    markReadText: { fontSize: 13, color: '#22C55E', fontWeight: '600' },

    // KEY FIX: overflow visible so chips aren't clipped
    tabScrollView: {
        overflow: 'visible',
    },
    tabScroll: {
        paddingHorizontal: 16,
        alignItems: 'center', // ← vertically centers chips inside the scroll
    },
    tabChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#F3F4F6',
        marginRight: 10,
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabChipActive: { backgroundColor: '#000' },
    tabText: {
        fontSize: 14,
        color: '#1F2937', // darkened for visibility
        fontWeight: '700',
    },
    tabTextActive: { color: '#FFF' },

    sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#9CA3AF', paddingHorizontal: 16, marginVertical: 12 },
    notificationCard: {
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        borderRadius: 16,
        borderLeftWidth: 4
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    iconRow: { flexDirection: 'row', alignItems: 'center' },
    avatarPlaceholder: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    statusDot: { position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: '#FFF' },
    titleContainer: { marginLeft: 12 },
    itemTitle: { fontSize: 14, fontWeight: 'bold', color: '#111827' },
    timeText: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
    description: { fontSize: 13, color: '#4B5563', lineHeight: 18, marginBottom: 15 },
    actionRow: { flexDirection: 'row', flexWrap: 'wrap' },
    actionBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, marginRight: 8, marginBottom: 8 },
    primaryAction: { backgroundColor: '#22C55E' },
    secondaryAction: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB' },
    dangerAction: { backgroundColor: '#FFF1F2', borderColor: '#FECACA' },
    actionBtnText: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
});

export default Notifications;