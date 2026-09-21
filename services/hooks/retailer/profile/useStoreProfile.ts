import { useCallback, useMemo, useState } from 'react';

export interface OperatingHour {
  day: string;
  shortDay: string;
  open: string;
  close: string;
  isEnabled: boolean;
}

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'tiktok' | 'twitter' | 'facebook';
  handle: string;
}

export interface StoreProfileData {
  name: string;
  description: string;
  location: string;
  address: string;
  phone: string;
  website: string;
  coverImageUri?: string;
  avatarLabel: string;
  isVerified: boolean;
  isPublic: boolean;
  operatingHours: OperatingHour[];
  socialLinks: SocialLink[];
}

const DEFAULT_HOURS: OperatingHour[] = [
  { day: 'Monday', shortDay: 'Mon', open: '10:00 AM', close: '9:00 PM', isEnabled: true },
  { day: 'Tuesday', shortDay: 'Tue', open: '10:00 AM', close: '9:00 PM', isEnabled: true },
  { day: 'Wednesday', shortDay: 'Wed', open: '10:00 AM', close: '9:00 PM', isEnabled: true },
  { day: 'Thursday', shortDay: 'Thu', open: '10:00 AM', close: '9:00 PM', isEnabled: true },
  { day: 'Friday', shortDay: 'Fri', open: '10:00 AM', close: '10:00 PM', isEnabled: true },
  { day: 'Saturday', shortDay: 'Sat', open: '10:00 AM', close: '8:00 PM', isEnabled: true },
  { day: 'Sunday', shortDay: 'Sun', open: '12:00 PM', close: '8:00 PM', isEnabled: true },
];

const DEFAULT_PROFILE: StoreProfileData = {
  name: "Sonny's Kicks",
  description:
    "Miami's destination for sneakers, apparel, new releases, and everyday essentials.",
  location: 'Miami, FL',
  address: '123 Ocean Drive, Miami, FL 33139',
  phone: '+1 (305) 555-0138',
  website: 'sonnykicks.com',
  avatarLabel: 'SK',
  isVerified: true,
  isPublic: true,
  operatingHours: DEFAULT_HOURS,
  socialLinks: [{ id: 'ig', platform: 'instagram', handle: '@SonnyKicks' }],
};

/** Groups consecutive days that share identical open/close/enabled state, e.g. "Mon – Thu". */
export function groupOperatingHours(hours: OperatingHour[]) {
  const groups: { label: string; open: string; close: string; isEnabled: boolean }[] = [];

  hours.forEach((h) => {
    const last = groups[groups.length - 1];
    if (last && last.open === h.open && last.close === h.close && last.isEnabled === h.isEnabled) {
      // Extend the label range, e.g. "Mon" -> "Mon – Thu"
      const [start] = last.label.split(' – ');
      last.label = `${start} – ${h.shortDay}`;
    } else {
      groups.push({ label: h.shortDay, open: h.open, close: h.close, isEnabled: h.isEnabled });
    }
  });

  return groups;
}

export const useStoreProfile = () => {
  const [profile, setProfile] = useState<StoreProfileData>(DEFAULT_PROFILE);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const markDirty = useCallback(() => setHasUnsavedChanges(true), []);

  const updateField = useCallback(
    <K extends keyof StoreProfileData>(key: K, value: StoreProfileData[K]) => {
      setProfile((prev) => ({ ...prev, [key]: value }));
      markDirty();
    },
    [markDirty]
  );

  const toggleDay = useCallback(
    (day: string) => {
      setProfile((prev) => ({
        ...prev,
        operatingHours: prev.operatingHours.map((h) =>
          h.day === day ? { ...h, isEnabled: !h.isEnabled } : h
        ),
      }));
      markDirty();
    },
    [markDirty]
  );

  const updateHour = useCallback(
    (day: string, field: 'open' | 'close', value: string) => {
      setProfile((prev) => ({
        ...prev,
        operatingHours: prev.operatingHours.map((h) =>
          h.day === day ? { ...h, [field]: value } : h
        ),
      }));
      markDirty();
    },
    [markDirty]
  );

  const copyHoursToAllDays = useCallback(() => {
    setProfile((prev) => {
      const source = prev.operatingHours.find((h) => h.isEnabled);
      if (!source) return prev;
      return {
        ...prev,
        operatingHours: prev.operatingHours.map((h) => ({
          ...h,
          open: source.open,
          close: source.close,
        })),
      };
    });
    markDirty();
  }, [markDirty]);

  const addSocialLink = useCallback(() => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        { id: `link-${Date.now()}`, platform: 'tiktok', handle: '' },
      ],
    }));
    markDirty();
  }, [markDirty]);

  const updateSocialLink = useCallback(
    (id: string, handle: string) => {
      setProfile((prev) => ({
        ...prev,
        socialLinks: prev.socialLinks.map((link) =>
          link.id === id ? { ...link, handle } : link
        ),
      }));
      markDirty();
    },
    [markDirty]
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise((res) => setTimeout(res, 900));
      setHasUnsavedChanges(false);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const handlePickCoverImage = useCallback(() => {
    // Replace with real image picker integration
  }, []);

  const groupedHours = useMemo(() => groupOperatingHours(profile.operatingHours), [
    profile.operatingHours,
  ]);

  return {
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
  };
};