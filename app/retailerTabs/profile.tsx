import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import BaseContainer from '@/components/shared/BaseContainer';
import StoreProfileHeader from '@/components/retailer/profile/StoreProfileHeader';
import StoreProfileCover from '@/components/retailer/profile/StoreProfileCover';
import StoreProfileDetails from '@/components/retailer/profile/StoreProfileDetails';
import StoreProfileBrand from '@/components/retailer/profile/StoreProfileBrand';
import StoreProfileHours from '@/components/retailer/profile/StoreProfileHours';
import StoreProfileSocial from '@/components/retailer/profile/StoreProfileSocial';
import { useStoreProfile } from '@/services/hooks/retailer/profile/useStoreProfile';

export const StoreProfileScreen: React.FC = () => {
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

        {/* ── Fixed header ── */}
        <StoreProfileHeader onSave={handleSave} isSaving={isSaving} />

        {/* ── Scrollable body ── */}
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cover + avatar */}
          <StoreProfileCover
            coverImageUri={profile.coverImageUri}
            avatarLabel={profile.avatarLabel}
            name={profile.name}
            location={profile.location}
            onPickCover={handlePickCoverImage}
          />

          {/* Store name + bio */}
          <StoreProfileDetails
            name={profile.name}
            bio={profile.bio}
            onNameChange={v => updateField('name', v)}
            onBioChange={v => updateField('bio', v)}
          />

          {/* Address, phone, website */}
          <StoreProfileBrand
            address={profile.address}
            phone={profile.phone}
            website={profile.website}
            onAddressChange={v => updateField('address', v)}
            onPhoneChange={v => updateField('phone', v)}
            onWebsiteChange={v => updateField('website', v)}
          />

          {/* Operating hours */}
          <StoreProfileHours
            hours={profile.operatingHours}
            onToggleDay={toggleDay}
            onUpdateHour={updateHour}
            onCopyToAll={copyHoursToAllDays}
          />

          {/* Social */}
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
});

export default StoreProfileScreen;