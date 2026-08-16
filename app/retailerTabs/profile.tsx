// app/retailerTabs/profile.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // ← add Feather

import BaseContainer from '@/components/shared/BaseContainer';
import StoreProfileHeader from '@/components/retailer/profile/StoreProfileHeader';
import StoreProfileCover from '@/components/retailer/profile/StoreProfileCover';
import StoreProfileDetails from '@/components/retailer/profile/StoreProfileDetails';
import StoreProfileBrand from '@/components/retailer/profile/StoreProfileBrand';
import StoreProfileHours from '@/components/retailer/profile/StoreProfileHours';
import StoreProfileSocial from '@/components/retailer/profile/StoreProfileSocial';
import { useStoreProfile } from '@/services/hooks/retailer/profile/useStoreProfile';
import { useRouter } from 'expo-router'; // ← add router

export const StoreProfileScreen: React.FC = () => {
  const router = useRouter(); // ← add router
  const {
    profile,
    isSaving,
    updateField,
    toggleDay,
    updateHour,
    copyHoursToAllDays,
    handleSave,
    handlePickCoverImage,
  } = useStoreProfile();

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.container}>
        <StoreProfileHeader />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <StoreProfileCover
            coverImageUri={profile.coverImageUri}
            avatarLabel={profile.avatarLabel}
            name={profile.name}
            location={profile.location}
            onPickCover={handlePickCoverImage}
          />
          <StoreProfileDetails
            name={profile.name}
            bio={profile.bio}
            onNameChange={v => updateField('name', v)}
            onBioChange={v => updateField('bio', v)}
          />
          <StoreProfileBrand
            address={profile.address}
            phone={profile.phone}
            website={profile.website}
            onAddressChange={v => updateField('address', v)}
            onPhoneChange={v => updateField('phone', v)}
            onWebsiteChange={v => updateField('website', v)}
          />
          <StoreProfileHours
            hours={profile.operatingHours}
            onToggleDay={toggleDay}
            onUpdateHour={updateHour}
            onCopyToAll={copyHoursToAllDays}
          />
          <StoreProfileSocial
            instagram={profile.instagram}
            onInstagramChange={v => updateField('instagram', v)}
          />

          {/* Save button */}
          <View style={styles.saveWrapper}>
            <TouchableOpacity
              onPress={handleSave}
              disabled={isSaving}
              activeOpacity={0.8}
              style={[styles.saveBtn, isSaving && { opacity: 0.6 }]}
            >
              <Text style={styles.saveBtnText}>
                {isSaving ? 'Saving…' : 'Save Store Profile'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Sign Out ── */}
          <View style={styles.signOutWrapper}>
            <TouchableOpacity
              onPress={() => router.replace('/auth/signInScreen')}
              activeOpacity={0.7}
              style={styles.signOutBtn}
            >
              <Feather name="log-out" size={18} color="#EF4444" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingBottom: 120 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  saveWrapper: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  saveBtn: {
    backgroundColor: '#111',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  // ── new ──
  signOutWrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    paddingVertical: 14,
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default StoreProfileScreen;