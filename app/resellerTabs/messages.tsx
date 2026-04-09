import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BaseContainer from '@/components/shared/BaseContainer';
import { useMessages } from '@/services/hooks/reseller/messages/useMessages';

const Messages = () => {
    const { chats, unreadTotal } = useMessages();

    return (
        <BaseContainer backgroundColor='#fff'>
            <View className='pt-10 '>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Messages</Text>
                    <TouchableOpacity>
                        <Ionicons name="search-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Unread Banner */}
                <View style={styles.unreadBanner}>
                    <Text style={styles.unreadBannerText}>{unreadTotal} unread conversations</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.listContainer}>
                        {chats.map((chat) => (
                            <TouchableOpacity key={chat.id} style={styles.chatItem}>
                                {/* Avatar with Online Indicator */}
                                <View style={styles.avatarContainer}>
                                    <View style={styles.avatarPlaceholder}>
                                        <Ionicons name="business" size={20} color="#fff" />
                                    </View>
                                    {chat.isOnline && <View style={styles.onlineDot} />}
                                </View>

                                {/* Message Content */}
                                <View style={styles.messageDetails}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.storeName}>{chat.storeName}</Text>
                                        <Text style={styles.timeText}>{chat.time}</Text>
                                    </View>

                                    <Text style={styles.lastMessage} numberOfLines={1}>
                                        {chat.lastMessage}
                                    </Text>

                                    {/* Item Context Box */}
                                    <View style={styles.itemContext}>
                                        <Image source={{ uri: chat.itemContext.image }} style={styles.contextImage} />
                                        <Text style={styles.contextText}>
                                            {chat.itemContext.name} · <Text style={styles.contextOffer}>{chat.itemContext.offer}</Text>
                                        </Text>
                                    </View>
                                </View>

                                {/* Unread Badge */}
                                {chat.unreadCount > 0 && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadBadgeText}>{chat.unreadCount}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </BaseContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 15
    },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    unreadBanner: {
        backgroundColor: '#F0FDF4',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DCFCE7'
    },
    unreadBannerText: { color: '#22C55E', fontSize: 13, fontWeight: '600' },
    listContainer: { paddingBottom: 100 },
    chatItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        alignItems: 'flex-start'
    },
    avatarContainer: { position: 'relative' },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#064E3B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    onlineDot: {
        position: 'absolute',
        top: 2,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#22C55E',
        borderWidth: 2,
        borderColor: '#FFF'
    },
    messageDetails: { flex: 1, marginLeft: 12 },
    nameRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    storeName: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    timeText: { fontSize: 12, color: '#9CA3AF' },
    lastMessage: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
    itemContext: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 6,
        borderRadius: 8,
        alignSelf: 'flex-start'
    },
    contextImage: { width: 24, height: 24, borderRadius: 4, marginRight: 8 },
    contextText: { fontSize: 11, color: '#9CA3AF' },
    contextOffer: { color: '#6B7280' },
    unreadBadge: {
        backgroundColor: '#22C55E',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    unreadBadgeText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
});

export default Messages;