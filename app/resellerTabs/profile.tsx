// app/resellerTabs/profile.tsx
import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import { useProfile } from '@/services/hooks/reseller/profile/useProfile'

const Profile = () => {
  const { user, items, deals } = useProfile()
  const router = useRouter()

  return (
    <BaseContainer backgroundColor="#fff">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pb-10 mt-10">
          {/* 1. Simplified header */}
          <View style={styles.navBar}>
            <Text style={styles.navTitle}>Profile</Text>
            <TouchableOpacity style={styles.settingsBtn} onPress={() => router.push('/screens/reseller/visibilityControlsScreen')}>
              <Ionicons name="settings-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <TouchableOpacity style={styles.editAvatarBtn}>
                <Feather name="edit-2" size={12} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.username}>{user.username}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.company}>{user.company}</Text>
              <Text style={styles.metaDot}>·</Text>
              <Ionicons name="location-outline" size={12} color="#9CA3AF" />
              <Text style={styles.locationText}>{user.location}</Text>
            </View>

            <View style={styles.trustedBadgeRow}>
              <View style={styles.trustedBadge}>
                <Ionicons name="shield-checkmark" size={13} color="#22C55E" />
                <Text style={styles.trustedText}>Trusted Reseller</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.editProfileBtn}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* 2. Key stats — tappable */}
          <View style={styles.statsRow}>
            <StatItem
              label="Deals Done"
              value={user.stats.dealsDone}
              onPress={() => router.push('/screens/reseller/submittedRequestsScreen')}
            />
            <StatItem
              label="Response Rate"
              value={`${user.stats.responseRate}%`}
              color="#22C55E"
              hasBorder
              onPress={() => router.push('/screens/reseller/submittedRequestsScreen')}
            />
            <StatItem
              label="Volume Sold"
              value={`$${user.stats.volumeSold}`}
              hasBorder
              onPress={() => router.push('/screens/reseller/submittedRequestsScreen')}
            />
            <StatItem
              label="Rating"
              value={user.stats.rating}
              color="#F59E0B"
              icon="star"
              onPress={() => router.push('/screens/reseller/resellerProfileScreen')}
            />
          </View>

          {/* 3. Inventory moved higher, with product image/name/size/price */}
          <SectionCard
            title="My Inventory"
            subTitle={`View All (${user.inventoryCount})`}
            actionText="View All"
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
              {items.map((item) => (
                <View key={item.id} style={styles.inventoryItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <Text style={styles.inventoryName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.inventoryMeta}>Size {item.size} · ${item.price}</Text>
                </View>
              ))}
            </ScrollView>
          </SectionCard>

          {/* 4. Deal history with product image, name, size, price, status, date */}
          <SectionCard
            title="Recent Deals"
            actionText="View All"
            onAction={() => router.push('/screens/reseller/submittedRequestsScreen')}
          >
            <View>
              {deals.map((deal) => (
                <View key={deal.id} style={styles.dealRow}>
                  <Image source={{ uri: deal.image }} style={styles.dealImage} />
                  <View style={styles.dealInfo}>
                    <Text style={styles.dealName} numberOfLines={1}>{deal.name}</Text>
                    <Text style={styles.dealMeta}>Size {deal.size} · ${deal.price}</Text>
                  </View>
                  <View style={styles.dealRight}>
                    <View style={styles.dealStatusBadge}>
                      <Text style={styles.dealStatusText}>{deal.status}</Text>
                    </View>
                    <Text style={styles.dealDate}>{deal.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          </SectionCard>

          {/* 5. Seller Information with verified check */}
          <SectionCard title="Seller Information" actionText="">
            <View style={styles.sellerInfoRow}>
              <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
              <Text style={styles.sellerInfoText}>Verified Identity</Text>
              <View style={{ flex: 1 }} />
              <Feather name="chevron-right" size={16} color="#9CA3AF" />
            </View>
            <View style={styles.sellerInfoRow}>
              <FontAwesome5 name="box-open" size={14} color="#3B82F6" />
              <Text style={styles.sellerInfoText}>Sneakers & Clothing</Text>
              <View style={{ flex: 1 }} />
              <Feather name="chevron-right" size={16} color="#9CA3AF" />
            </View>
            <Text style={styles.aboutText}>{user.bio}</Text>
          </SectionCard>

          {/* 6. Account section */}
          <SectionCard title="Account" actionText="">
            <AccountRow icon="person-outline" label="Edit Profile" onPress={() => {}} />
            <AccountRow icon="storefront-outline" label="Store Information" onPress={() => {}} />
            <AccountRow icon="notifications-outline" label="Notifications" onPress={() => router.push('/screens/reseller/notifications')} />
            <AccountRow icon="card-outline" label="Payment / Payout Settings" onPress={() => {}} />
            <AccountRow icon="lock-closed-outline" label="Security" onPress={() => {}} />
            <AccountRow icon="help-circle-outline" label="Help & Support" onPress={() => {}} last />
          </SectionCard>

          {/* 7. Sign out moved inside Account/Settings, larger button */}
          <View style={styles.signOutWrapper}>
            <TouchableOpacity
              onPress={() => router.replace('/auth/signInScreen')}
              activeOpacity={0.7}
              style={styles.signOutBtn}
            >
              <Feather name="log-out" size={20} color="#EF4444" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

const StatItem = ({
  label,
  value,
  color = '#111827',
  hasBorder,
  icon,
  onPress,
}: {
  label: string
  value: string | number
  color?: string
  hasBorder?: boolean
  icon?: 'star'
  onPress?: () => void
}) => (
  <TouchableOpacity style={[styles.statItem, hasBorder && styles.statBorder]} onPress={onPress} activeOpacity={0.6}>
    <View style={styles.valueContainer}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {icon ? <Ionicons name={icon} size={14} color={color} style={{ marginLeft: 4 }} /> : null}
    </View>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
)

const AccountRow = ({
  icon,
  label,
  onPress,
  last,
}: {
  icon: any
  label: string
  onPress?: () => void
  last?: boolean
}) => (
  <TouchableOpacity
    style={[styles.accountRow, !last && styles.accountRowBorder]}
    onPress={onPress}
    activeOpacity={0.6}
  >
    <Ionicons name={icon} size={18} color="#4B5563" />
    <Text style={styles.accountRowLabel}>{label}</Text>
    <View style={{ flex: 1 }} />
    <Feather name="chevron-right" size={16} color="#9CA3AF" />
  </TouchableOpacity>
)

const SectionCard = ({
  title,
  subTitle,
  actionText,
  onAction,
  children,
}: {
  title: string
  subTitle?: string
  actionText: string
  onAction?: () => void
  children: React.ReactNode
}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      {actionText ? (
        <TouchableOpacity style={styles.actionRow} onPress={onAction}>
          <Text style={styles.actionText}>{actionText}</Text>
          <Ionicons name="arrow-forward" size={13} color="#22C55E" />
        </TouchableOpacity>
      ) : null}
    </View>
    {children}
  </View>
)

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    height: 44,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  settingsBtn: { padding: 4 },
  profileHeader: { alignItems: 'center', backgroundColor: '#F9FAFB', paddingVertical: 24, paddingHorizontal: 16 },
  avatarContainer: { marginBottom: 12 },
  avatar: { width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: '#22C55E' },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  username: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
  company: { fontSize: 13, color: '#6B7280' },
  metaDot: { fontSize: 13, color: '#D1D5DB' },
  locationText: { fontSize: 12, color: '#9CA3AF' },
  trustedBadgeRow: { marginTop: 14 },
  trustedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  trustedText: { color: '#22C55E', fontWeight: '700', fontSize: 13 },
  editProfileBtn: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  editProfileText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#F3F4F6' },
  valueContainer: { flexDirection: 'row', alignItems: 'center' },
  statValue: { fontSize: 17, fontWeight: 'bold' },
  statLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 4, textAlign: 'center' },
  card: { padding: 20, borderBottomWidth: 8, borderBottomColor: '#F9FAFB' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  subTitle: { fontSize: 12, color: '#22C55E', marginTop: 2 },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  actionText: { color: '#22C55E', fontSize: 13, fontWeight: '600', marginRight: 4 },
  imageScroll: { flexDirection: 'row' },
  inventoryItem: { marginRight: 12, width: 100 },
  itemImage: { width: 100, height: 100, borderRadius: 14, backgroundColor: '#F3F4F6', marginBottom: 6 },
  inventoryName: { fontSize: 12, fontWeight: '600', color: '#111827' },
  inventoryMeta: { fontSize: 11, color: '#9CA3AF', marginTop: 1 },
  dealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dealImage: { width: 48, height: 48, borderRadius: 10, backgroundColor: '#F3F4F6' },
  dealInfo: { flex: 1, marginLeft: 12 },
  dealName: { fontSize: 13, fontWeight: '600', color: '#111827' },
  dealMeta: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  dealRight: { alignItems: 'flex-end' },
  dealStatusBadge: { backgroundColor: '#F0FDF4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  dealStatusText: { fontSize: 11, fontWeight: '700', color: '#22C55E' },
  dealDate: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  sellerInfoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  sellerInfoText: { fontSize: 14, color: '#374151', fontWeight: '500' },
  aboutText: { fontSize: 13, color: '#6B7280', lineHeight: 20, marginTop: 8 },
  accountRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  accountRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  accountRowLabel: { fontSize: 14, color: '#111827', fontWeight: '500' },
  signOutWrapper: { paddingHorizontal: 16, paddingTop: 16,paddingBottom:30 },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    paddingVertical: 16,
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',

  },
})

export default Profile