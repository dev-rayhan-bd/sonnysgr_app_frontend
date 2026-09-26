import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import BaseContainer from '@/components/shared/BaseContainer';
import { useStoreProfile } from '@/services/hooks/retailer/profile/useStoreProfile';

const COVER_IMAGE_URL =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80';

export const StoreProfileScreen: React.FC = () => {
  const router = useRouter();
  const {
    profile,
    groupedHours,
    isSaving,
    hasUnsavedChanges,
    updateField,
    toggleDay,
    updateHour,
    copyHoursToAllDays,
    addSocialLink,
    updateSocialLink,
    handleSave,
    handlePickCoverImage,
  } = useStoreProfile();

  return (
    <BaseContainer backgroundColor="#F9FAFB" scrollable>
      <View style={{ flex: 1, paddingBottom: 120 ,paddingTop:30}}>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="arrow-left" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Store Profile</Text>
          <TouchableOpacity>
            <Text style={s.previewLink}>Preview</Text>
          </TouchableOpacity>
        </View>

        {/* Location selector */}
        <TouchableOpacity style={s.locationSelector}>
          <Feather name="map-pin" size={14} color="#6B7280" />
          <Text style={s.locationSelectorText}>Sonny's Kicks — Main St</Text>
          <Feather name="chevron-down" size={16} color="#6B7280" />
        </TouchableOpacity>

        {/* Public profile note */}
        <View style={s.publicNoteRow}>
          <View style={s.publicDot} />
          <View style={{ flex: 1 }}>
            <Text style={s.publicNoteTitle}>Public profile</Text>
            <Text style={s.publicNoteSubtitle}>This is how your store appears to customers on GoSNKR.</Text>
          </View>
        </View>

        {/* Cover image */}
        <View style={s.coverWrap}>
          <ImageBackground
            source={{ uri: profile.coverImageUri ?? COVER_IMAGE_URL }}
            style={s.coverImage}
            imageStyle={{ borderRadius: 22 }}
          >
            <TouchableOpacity style={s.editCoverBtn} onPress={handlePickCoverImage}>
              <Feather name="edit-2" size={12} color="#111827" />
              <Text style={s.editCoverText}>Edit cover</Text>
            </TouchableOpacity>
          </ImageBackground>

          {/* Avatar overlapping cover */}
          <View style={s.avatarWrap}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{profile.avatarLabel}</Text>
            </View>
            <TouchableOpacity style={s.avatarEditBadge} onPress={handlePickCoverImage}>
              <Feather name="edit-2" size={10} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Name + verified + location */}
        <View style={s.nameSection}>
          <View style={s.nameRow}>
            <Text style={s.storeName}>{profile.name}</Text>
            {profile.isVerified && <Feather name="check-circle" size={17} color="#10B981" />}
          </View>
          <Text style={s.storeLocation}>{profile.location}</Text>
        </View>

        {/* Basic information */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Basic information</Text>

          <Text style={s.fieldLabel}>Store name</Text>
          <View style={s.inputBox}>
            <TextInput
              value={profile.name}
              onChangeText={(v) => updateField('name', v)}
              style={s.inputText}
            />
          </View>

          <Text style={[s.fieldLabel, { marginTop: 14 }]}>Store description</Text>
          <View style={s.textareaBox}>
            <TextInput
              value={profile.description}
              onChangeText={(v) => updateField('description', v)}
              multiline
              maxLength={300}
              style={s.textareaText}
            />
          </View>
          <Text style={s.charCounter}>{profile.description.length}/300</Text>

          <Text style={[s.fieldLabel, { marginTop: 14 }]}>Address</Text>
          <View style={s.addressRow}>
            <Feather name="map-pin" size={14} color="#9CA3AF" />
            <Text style={s.addressText}>{profile.address}</Text>
          </View>
          <TouchableOpacity>
            <Text style={s.verifyLink}>Verify on map</Text>
          </TouchableOpacity>

          <View style={s.contactRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.fieldLabel}>Phone</Text>
              <View style={s.inputBox}>
                <TextInput
                  value={profile.phone}
                  onChangeText={(v) => updateField('phone', v)}
                  keyboardType="phone-pad"
                  style={s.inputText}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.fieldLabel}>Website</Text>
              <View style={s.inputBox}>
                <TextInput
                  value={profile.website}
                  onChangeText={(v) => updateField('website', v)}
                  autoCapitalize="none"
                  style={s.inputText}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Business hours */}
        <View style={s.card}>
          <View style={s.cardHeaderRow}>
            <Text style={s.cardTitle}>Business hours</Text>
            <TouchableOpacity onPress={copyHoursToAllDays}>
              <Text style={s.editMultipleLink}>Edit multiple days</Text>
            </TouchableOpacity>
          </View>

          {groupedHours.map((group, i) => (
            <View key={i} style={s.hourRow}>
              <Text style={s.hourDayLabel}>{group.label}</Text>
              <Text style={s.hourTimeLabel}>
                {group.isEnabled ? `${group.open} - ${group.close}` : 'Closed'}
              </Text>
              <View style={[s.hourStatusPill, group.isEnabled ? s.hourStatusOpen : s.hourStatusClosed]}>
                <Text style={[s.hourStatusText, { color: group.isEnabled ? '#059669' : '#9CA3AF' }]}>
                  {group.isEnabled ? 'Open' : 'Closed'}
                </Text>
              </View>
              <Feather name="chevron-right" size={16} color="#D1D5DB" />
            </View>
          ))}

          <TouchableOpacity style={s.addHoursBtn}>
            <Feather name="plus" size={14} color="#4B5563" />
            <Text style={s.addHoursText}>Add special or holiday hours</Text>
          </TouchableOpacity>
          <Text style={s.hoursFootnote}>Hours are shown in the store's local time.</Text>
        </View>

        {/* Social links */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Social links</Text>

          {profile.socialLinks.map((link) => (
            <View key={link.id} style={{ marginBottom: 12 }}>
              <Text style={s.fieldLabel}>{capitalize(link.platform)}</Text>
              <View style={s.socialInputBox}>
                <Ionicons name={getSocialIcon(link.platform)} size={16} color="#9CA3AF" />
                <TextInput
                  value={link.handle}
                  onChangeText={(v) => updateSocialLink(link.id, v)}
                  placeholder="@yourstore"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  style={s.socialInputText}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={s.addSocialBtn} onPress={addSocialLink}>
            <Feather name="plus" size={14} color="#4B5563" />
            <Text style={s.addSocialText}>Add another social link</Text>
          </TouchableOpacity>
        </View>

        {/* Account */}
        <View style={s.card}>
          <View style={s.accountRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.cardTitle}>Account</Text>
              <Text style={s.accountSubtitle}>Manage your account, security, and sign out</Text>
            </View>
            <TouchableOpacity style={s.accountLinkBtn}>
              <Text style={s.accountLinkText}>Account & security</Text>
              <Feather name="chevron-right" size={15} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sticky save bar */}
      <View style={s.saveBar}>
        {hasUnsavedChanges && (
          <View style={s.unsavedRow}>
            <View style={s.unsavedDot} />
            <Text style={s.unsavedText}>Unsaved changes</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={handleSave}
          disabled={isSaving}
          style={[s.saveBtn, isSaving && { opacity: 0.7 }]}
        >
          <Text style={s.saveBtnText}>{isSaving ? 'Saving…' : 'Save Changes'}</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  );
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getSocialIcon(platform: string): any {
  switch (platform) {
    case 'instagram':
      return 'logo-instagram';
    case 'tiktok':
      return 'logo-tiktok';
    case 'twitter':
      return 'logo-twitter';
    case 'facebook':
      return 'logo-facebook';
    default:
      return 'link';
  }
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#111827' },
  previewLink: { fontSize: 13, fontWeight: '800', color: '#10B981' },

  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  locationSelectorText: { fontSize: 13, fontWeight: '700', color: '#111827' },

  publicNoteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  publicDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#10B981', marginTop: 5 },
  publicNoteTitle: { fontSize: 12, fontWeight: '800', color: '#111827' },
  publicNoteSubtitle: { fontSize: 11, color: '#9CA3AF', marginTop: 2, fontWeight: '600' },

  coverWrap: { marginHorizontal: 16, marginBottom: 44 },
  coverImage: { height: 150, borderRadius: 22, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-end' },
  editCoverBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    margin: 10,
  },
  editCoverText: { fontSize: 11, fontWeight: '800', color: '#111827' },
  avatarWrap: { position: 'absolute', left: 16, bottom: -30 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F9FAFB',
  },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '900' },
  avatarEditBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F9FAFB',
  },

  nameSection: { paddingHorizontal: 16, marginBottom: 18 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  storeName: { fontSize: 19, fontWeight: '900', color: '#111827' },
  storeLocation: { fontSize: 12, color: '#9CA3AF', marginTop: 2, fontWeight: '600' },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  cardTitle: { fontSize: 15, fontWeight: '900', color: '#111827', marginBottom: 14 },
  editMultipleLink: { fontSize: 12, fontWeight: '800', color: '#10B981' },

  fieldLabel: { fontSize: 12, color: '#6B7280', fontWeight: '700', marginBottom: 8 },
  inputBox: { backgroundColor: '#F9FAFB', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },
  inputText: { fontSize: 14, color: '#111827', fontWeight: '600' },
  textareaBox: { backgroundColor: '#F9FAFB', borderRadius: 14, padding: 14, minHeight: 70 },
  textareaText: { fontSize: 13, color: '#111827', fontWeight: '600', textAlignVertical: 'top' },
  charCounter: { fontSize: 10, color: '#D1D5DB', textAlign: 'right', marginTop: 4, fontWeight: '600' },

  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  addressText: { fontSize: 13, color: '#111827', fontWeight: '600', flexShrink: 1 },
  verifyLink: { fontSize: 12, fontWeight: '800', color: '#10B981', marginTop: 6, alignSelf: 'flex-end' },

  contactRow: { flexDirection: 'row', gap: 12, marginTop: 16 },

  hourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  hourDayLabel: { width: 60, fontSize: 13, fontWeight: '800', color: '#111827' },
  hourTimeLabel: { flex: 1, fontSize: 12, color: '#6B7280', fontWeight: '600' },
  hourStatusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  hourStatusOpen: { backgroundColor: '#ECFDF5' },
  hourStatusClosed: { backgroundColor: '#F3F4F6' },
  hourStatusText: { fontSize: 11, fontWeight: '800' },

  addHoursBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 12,
    marginTop: 14,
  },
  addHoursText: { fontSize: 12, fontWeight: '700', color: '#4B5563' },
  hoursFootnote: { fontSize: 11, color: '#9CA3AF', marginTop: 10, fontWeight: '600' },

  socialInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  socialInputText: { flex: 1, fontSize: 13, color: '#111827', fontWeight: '600' },
  addSocialBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 12,
    marginTop: 4,
  },
  addSocialText: { fontSize: 12, fontWeight: '700', color: '#4B5563' },

  accountRow: { flexDirection: 'row', alignItems: 'center' },
  accountSubtitle: { fontSize: 11, color: '#9CA3AF', marginTop: -8, fontWeight: '600' },
  accountLinkBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  accountLinkText: { fontSize: 12, fontWeight: '700', color: '#6B7280' },

  saveBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  unsavedRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  unsavedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#F59E0B' },
  unsavedText: { fontSize: 11, color: '#D97706', fontWeight: '700' },
  saveBtn: { backgroundColor: '#111827', height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 14, fontWeight: '800' },
});

export default StoreProfileScreen;