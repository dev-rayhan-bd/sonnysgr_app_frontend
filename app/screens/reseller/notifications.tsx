import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import BaseContainer from '@/components/shared/BaseContainer';
import { useNotifications, NotificationItem } from '@/services/hooks/reseller/dashboard/useNotifications';

const Notifications = () => {
    const router = useRouter();
    const { sections, activeTab, setActiveTab, tabCounts, markAllRead, markRead, deleteNotification, totalCount } = useNotifications();
    const [showConfirm, setShowConfirm] = useState(false);
    const swipeRefs = useRef<Record<string, Swipeable | null>>({});

    const handleMarkAllRead = () => {
        markAllRead();
        setShowConfirm(true);
        setTimeout(() => setShowConfirm(false), 2200);
    };

    const closeOthers = (exceptId: string) => {
        Object.entries(swipeRefs.current).forEach(([id, ref]) => {
            if (id !== exceptId) ref?.close();
        });
    };

    // 9. Tapping a notification opens the relevant request, deal, or listing
    const handleNotificationTap = (item: NotificationItem) => {
        markRead(item.id);
        if (item.type === 'request') return router.push('/screens/reseller/requestDetailsScreen');
        if (item.type === 'counter') return router.push('/screens/reseller/requestDetailsScreen');
        if (item.type === 'deal') return router.push('/screens/reseller/submittedRequestsScreen');
        if (item.type === 'declined') return router.push('/resellerTabs/listing');
        if (item.type === 'trust') return router.push('/resellerTabs/profile');
        if (item.type === 'info') return router.push('/resellerTabs/profile');
    };

    const renderLeftActions = (item: NotificationItem) => (
        <TouchableOpacity
            style={styles.swipeUnreadBtn}
            onPress={() => {
                markRead(item.id, !item.isRead);
                swipeRefs.current[item.id]?.close();
            }}
        >
            <Ionicons name={item.isRead ? 'mail-unread-outline' : 'mail-open-outline'} size={20} color="#FFF" />
            <Text style={styles.swipeActionText}>{item.isRead ? 'Unread' : 'Read'}</Text>
        </TouchableOpacity>
    );

    const renderRightActions = (item: NotificationItem) => (
        <TouchableOpacity
            style={styles.swipeDeleteBtn}
            onPress={() => {
                deleteNotification(item.id);
                swipeRefs.current[item.id]?.close();
            }}
        >
            <Ionicons name="trash-outline" size={20} color="#FFF" />
            <Text style={styles.swipeActionText}>Delete</Text>
        </TouchableOpacity>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BaseContainer backgroundColor='#fff'>
                <View className='pt-10 pb-20 flex-1'>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={22} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Notifications</Text>
                        <TouchableOpacity onPress={handleMarkAllRead}>
                            <Text style={styles.markReadText}>Mark all read</Text>
                        </TouchableOpacity>
                    </View>

                    {showConfirm && (
                        <View style={styles.confirmBanner}>
                            <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
                            <Text style={styles.confirmText}>All notifications marked as read</Text>
                        </View>
                    )}

                    {/* Filter tabs with counts in parentheses */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabScroll}
                        style={styles.tabScrollView}
                    >
                        {(['All', 'Requests', 'Deals', 'Alerts'] as const).map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                    {tab} ({tabCounts[tab]})
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className='pb-20'>
                            {sections.map((section) => (
                                <View key={section.title}>
                                    <View style={styles.sectionHeaderRow}>
                                        {section.title === 'Action Required' && (
                                            <Ionicons name="warning" size={13} color="#EF4444" />
                                        )}
                                        <Text style={[styles.sectionTitle, section.title === 'Action Required' && styles.sectionTitleAlert]}>
                                            {section.title} {section.title === 'Action Required' ? `(${section.data.length})` : ''}
                                        </Text>
                                    </View>
                                    {section.data.map((item) => (
                                        <Swipeable
                                            key={item.id}
                                            ref={(ref) => { swipeRefs.current[item.id] = ref }}
                                            onSwipeableWillOpen={() => closeOthers(item.id)}
                                            renderLeftActions={() => renderLeftActions(item)}
                                            renderRightActions={() => renderRightActions(item)}
                                            overshootLeft={false}
                                            overshootRight={false}
                                        >
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => handleNotificationTap(item)}
                                                style={[
                                                    styles.notificationCard,
                                                    { backgroundColor: item.bgColor, borderLeftColor: item.color }
                                                ]}
                                            >
                                                <View style={styles.cardHeader}>
                                                    <View style={styles.iconRow}>
                                                        <View style={[styles.avatarPlaceholder, { backgroundColor: `${item.color}20` }]}>
                                                            {item.initials ? (
                                                                <Text style={{ color: item.color, fontWeight: 'bold', fontSize: 12 }}>{item.initials}</Text>
                                                            ) : (
                                                                <Ionicons name={item.icon as any} size={16} color={item.color} />
                                                            )}
                                                            {!item.isRead && <View style={[styles.statusDot, { backgroundColor: item.color }]} />}
                                                        </View>
                                                        <View style={styles.titleContainer}>
                                                            <Text style={styles.itemTitle}>{item.title}</Text>
                                                            <Text style={styles.timeText}>{item.time}</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

                                                {item.actions && (
                                                    <View style={styles.actionRow}>
                                                        {item.actions.map((action, idx) => (
                                                            <TouchableOpacity
                                                                key={idx}
                                                                onPress={() => handleNotificationTap(item)}
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
                                                                    {action}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                        </Swipeable>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </BaseContainer>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    markReadText: { fontSize: 13, color: '#22C55E', fontWeight: '600' },
    confirmBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#F0FDF4',
        marginHorizontal: 16,
        marginBottom: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    confirmText: { color: '#22C55E', fontSize: 12, fontWeight: '600' },

    tabScrollView: {
        overflow: 'visible',
    },
    tabScroll: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    tabChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        marginRight: 8,
        minWidth: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabChipActive: { backgroundColor: '#000' },
    tabText: {
        fontSize: 13,
        color: '#1F2937',
        fontWeight: '700',
    },
    tabTextActive: { color: '#FFF' },

    sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginVertical: 10, gap: 5 },
    sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#9CA3AF' },
    sectionTitleAlert: { color: '#EF4444' },

    notificationCard: {
        marginHorizontal: 16,
        marginBottom: 10,
        padding: 12,
        borderRadius: 14,
        borderLeftWidth: 4,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    iconRow: { flexDirection: 'row', alignItems: 'center' },
    avatarPlaceholder: { width: 34, height: 34, borderRadius: 9, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    statusDot: { position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: '#FFF' },
    titleContainer: { marginLeft: 10 },
    itemTitle: { fontSize: 13, fontWeight: 'bold', color: '#111827' },
    timeText: { fontSize: 10, color: '#9CA3AF', marginTop: 1 },
    description: { fontSize: 12, color: '#4B5563', lineHeight: 16, marginBottom: 10 },
    actionRow: { flexDirection: 'row', flexWrap: 'wrap' },
    actionBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10, marginRight: 8, marginBottom: 6 },
    primaryAction: { backgroundColor: '#22C55E' },
    secondaryAction: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB' },
    dangerAction: { backgroundColor: '#FFF1F2', borderColor: '#FECACA' },
    actionBtnText: { fontSize: 11, fontWeight: 'bold', color: '#111827' },

    swipeUnreadBtn: {
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        width: 84,
        gap: 4,
        marginBottom: 10,
        marginLeft: 16,
        borderRadius: 14,
    },
    swipeDeleteBtn: {
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
        width: 84,
        gap: 4,
        marginBottom: 10,
        marginRight: 16,
        borderRadius: 14,
    },
    swipeActionText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});

export default Notifications;