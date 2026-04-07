import { useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OperatingHour {
  day: string;
  open: string;
  close: string;
  isEnabled: boolean;
}

export interface StoreProfileData {
  name: string;
  bio: string;
  location: string;
  address: string;
  phone: string;
  website: string;
  instagram: string;
  coverImageUri?: string;
  avatarLabel: string;
  operatingHours: OperatingHour[];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_HOURS: OperatingHour[] = [
  { day: 'Monday',    open: '10:02 AM', close: '11:00 PM', isEnabled: true },
  { day: 'Tuesday',   open: '10:00 AM', close: '7:00 PM',  isEnabled: true },
  { day: 'Wednesday', open: '10:00 AM', close: '9:00 PM',  isEnabled: true },
  { day: 'Thursday',  open: '10:00 AM', close: '9:00 PM',  isEnabled: true },
  { day: 'Friday',    open: '10:00 AM', close: '10:00 PM', isEnabled: true },
  { day: 'Saturday',  open: '10:00 AM', close: '8:00 PM',  isEnabled: true },
  { day: 'Sunday',    open: '12:00 PM', close: '8:00 PM',  isEnabled: true },
];

export const useStoreProfile = () => {
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState<StoreProfileData>({
    name: "Sonny's Kicks",
    bio: '',
    location: 'Miami, FL',
    address: '123 Ocean Drive, Miami, FL 33139',
    phone: '+1 (305) 555-0138',
    website: 'https://sonnykicks.com',
    instagram: '@SonnyKicks',
    avatarLabel: 'SK',
    operatingHours: DEFAULT_HOURS,
  });

  // Field updater
  const updateField = useCallback(
    <K extends keyof StoreProfileData>(key: K, value: StoreProfileData[K]) => {
      setProfile(prev => ({ ...prev, [key]: value }));
    },
    [],
  );

  // Toggle a day on/off
  const toggleDay = useCallback((day: string) => {
    setProfile(prev => ({
      ...prev,
      operatingHours: prev.operatingHours.map(h =>
        h.day === day ? { ...h, isEnabled: !h.isEnabled } : h,
      ),
    }));
  }, []);

  // Update open/close time for a day
  const updateHour = useCallback(
    (day: string, field: 'open' | 'close', value: string) => {
      setProfile(prev => ({
        ...prev,
        operatingHours: prev.operatingHours.map(h =>
          h.day === day ? { ...h, [field]: value } : h,
        ),
      }));
    },
    [],
  );

  // Copy first enabled day's hours to all days
  const copyHoursToAllDays = useCallback(() => {
    const source = profile.operatingHours.find(h => h.isEnabled);
    if (!source) return;
    setProfile(prev => ({
      ...prev,
      operatingHours: prev.operatingHours.map(h => ({
        ...h,
        open: source.open,
        close: source.close,
      })),
    }));
  }, [profile.operatingHours]);

  // Save
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      // Replace with real API call
      await new Promise(res => setTimeout(res, 1000));
      console.log('profile saved', profile);
    } finally {
      setIsSaving(false);
    }
  }, [profile]);

  // Cover image picker
  const handlePickCoverImage = useCallback(() => {
    console.log('pick cover image');
  }, []);

  return {
    profile,
    isSaving,
    updateField,
    toggleDay,
    updateHour,
    copyHoursToAllDays,
    handleSave,
    handlePickCoverImage,
  };
};