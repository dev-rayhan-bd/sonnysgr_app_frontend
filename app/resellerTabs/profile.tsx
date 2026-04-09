import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import BaseContainer from '@/components/shared/BaseContainer';
import { useProfile } from '@/services/hooks/reseller/profile/useProfile';

const Profile = () => {
    const { user, items } = useProfile();

    return (
        <BaseContainer backgroundColor='#fff'>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Internal container to handle the specific padding requested */}
                <View className='pt-10 pb-20 mb-20'>
                    
                    {/* Top Navigation Bar */}
                    <View style={styles.navBar}>
                        <View style={{ flex: 1 }} />
                        <View style={styles.navIcons}>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Ionicons name="settings-outline" size={22} color="#333" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Ionicons name="share-outline" size={22} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Profile Header Section */}
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <Image 
                                source={{ uri: 'https://i.pravatar.cc/150?u=marcus' }} 
                                style={styles.avatar} 
                            />
                            <TouchableOpacity style={styles.editAvatarBtn}>
                                <Feather name="edit-2" size={14} color="#666" />
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={styles.username}>{user.username}</Text>
                        <Text style={styles.company}>{user.company}</Text>
                        
                        <View style={styles.locationRow}>
                            <Ionicons name="location-outline" size={14} color="#9CA3AF" />
                            <Text style={styles.locationText}>{user.location}</Text>
                        </View>

                        <View style={styles.trustedBadge}>
                            <Text style={styles.trustedText}>🛡️ Trusted Reseller</Text>
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <StatItem label="Deals Done" value={user.stats.dealsDone} />
                        <StatItem 
                            label="Response Rate" 
                            value={`${user.stats.responseRate}%`} 
                            color="#22C55E" 
                            hasBorder 
                        />
                        <StatItem 
                            label="Volume Sold" 
                            value={`$${user.stats.volumeSold}`} 
                            hasBorder 
                        />
                        <StatItem 
                            label="Rating" 
                            value={user.stats.rating} 
                            color="#F59E0B" 
                            icon="star" 
                        />
                    </View>

                    {/* Verification Badges */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeScroll}>
                        <View style={[styles.badge, { backgroundColor: '#F0FDF4' }]}>
                            <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                            <Text style={[styles.badgeText, { color: '#22C55E' }]}>Verified Identity</Text>
                        </View>
                        <View style={[styles.badge, { backgroundColor: '#EFF6FF' }]}>
                            <FontAwesome5 name="box-open" size={12} color="#3B82F6" />
                            <Text style={[styles.badgeText, { color: '#3B82F6' }]}>Deadstock Specialist</Text>
                        </View>
                    </ScrollView>

                    {/* About Section */}
                    <SectionCard title="About" actionText="Edit bio">
                        <Text style={styles.cardContent}>{user.bio}</Text>
                    </SectionCard>

                    {/* Inventory Section */}
                    <SectionCard 
                        title="My Inventory" 
                        actionText="View All" 
                        subTitle={`• ${user.inventoryCount} pairs visible to stores`}
                    >
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                            {items.map((item) => (
                                <Image key={item.id} source={{ uri: item.image }} style={styles.itemImage} />
                            ))}
                        </ScrollView>
                    </SectionCard>

                    {/* Deal History Section */}
                    <SectionCard title="My Deal History" actionText="View All">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                            {items.map((item) => (
                                <Image key={`history-${item.id}`} source={{ uri: item.image }} style={styles.itemImage} />
                            ))}
                        </ScrollView>
                    </SectionCard>
                </View>
            </ScrollView>
        </BaseContainer>
    );
};

// Internal Sub-components
const StatItem = ({ label, value, color = '#111827', hasBorder, icon }: any) => (
    <View style={[styles.statItem, hasBorder && styles.statBorder]}>
        <View style={styles.valueContainer}>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            {icon && <Ionicons name={icon} size={16} color={color} style={{ marginLeft: 4 }} />}
        </View>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const SectionCard = ({ title, subTitle, actionText, children }: any) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View>
                <Text style={styles.cardTitle}>{title}</Text>
                {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
            </View>
            <TouchableOpacity style={styles.actionRow}>
                <Text style={styles.actionText}>{actionText}</Text>
                <Ionicons name="arrow-forward" size={14} color="#22C55E" />
            </TouchableOpacity>
        </View>
        {children}
    </View>
);

const styles = StyleSheet.create({
    navBar: { flexDirection: 'row', paddingHorizontal: 16, height: 40, alignItems: 'center' },
    navIcons: { flexDirection: 'row' },
    iconBtn: { marginLeft: 20 },
    profileHeader: { alignItems: 'center', backgroundColor: '#F9FAFB', paddingVertical: 30, marginTop: 10 },
    avatarContainer: { marginBottom: 15 },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#22C55E' },
    editAvatarBtn: { 
        position: 'absolute', bottom: 0, right: 0, 
        backgroundColor: '#FFF', padding: 6, borderRadius: 15,
        elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5
    },
    username: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
    company: { fontSize: 14, color: '#6B7280', marginTop: 4 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    locationText: { fontSize: 12, color: '#9CA3AF', marginLeft: 4 },
    trustedBadge: { 
        backgroundColor: '#22C55E', paddingHorizontal: 20, 
        paddingVertical: 10, borderRadius: 25, marginTop: 20 
    },
    trustedText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    statsRow: { 
        flexDirection: 'row', paddingVertical: 20, 
        borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
        marginHorizontal: 16
    },
    statItem: { flex: 1, alignItems: 'center' },
    statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#F3F4F6' },
    valueContainer: { flexDirection: 'row', alignItems: 'center' },
    statValue: { fontSize: 18, fontWeight: 'bold' },
    statLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 4, textAlign: 'center' },
    badgeScroll: { paddingLeft: 16, marginVertical: 20 },
    badge: { 
        flexDirection: 'row', alignItems: 'center', 
        paddingHorizontal: 12, paddingVertical: 8, 
        borderRadius: 10, marginRight: 10 
    },
    badgeText: { fontSize: 12, fontWeight: '600', marginLeft: 6 },
    card: { padding: 20, borderBottomWidth: 8, borderBottomColor: '#F9FAFB' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    subTitle: { fontSize: 12, color: '#22C55E', marginTop: 2 },
    actionRow: { flexDirection: 'row', alignItems: 'center' },
    actionText: { color: '#22C55E', fontSize: 13, fontWeight: '600', marginRight: 4 },
    cardContent: { fontSize: 14, color: '#4B5563', lineHeight: 22 },
    imageScroll: { flexDirection: 'row' },
    itemImage: { width: 90, height: 90, borderRadius: 15, marginRight: 12, backgroundColor: '#F3F4F6' },
});

export default Profile;