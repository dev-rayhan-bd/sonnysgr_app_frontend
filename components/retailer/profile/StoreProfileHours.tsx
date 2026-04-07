import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Switch, Modal,
  ScrollView, Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { OperatingHour } from '@/services/hooks/retailer/profile/useStoreProfile';

interface StoreProfileHoursProps {
  hours: OperatingHour[];
  onToggleDay: (day: string) => void;
  onUpdateHour: (day: string, field: 'open' | 'close', value: string) => void;
  onCopyToAll: () => void;
}

// Simple time picker options (30-min slots)
const TIME_OPTIONS = [
  '6:00 AM','6:30 AM','7:00 AM','7:30 AM','8:00 AM','8:30 AM',
  '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM',
  '3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM',
  '6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM',
  '9:00 PM','9:30 PM','10:00 PM','10:30 PM','11:00 PM','11:30 PM',
];

interface TimePickerState {
  visible: boolean;
  day: string;
  field: 'open' | 'close';
  current: string;
}

const SECTION_LABEL_STYLE = {
  fontSize: 10, fontWeight: '700' as const,
  color: '#9CA3AF', letterSpacing: 0.8,
  paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6,
  backgroundColor: '#F5F5F5',
} as const;

const StoreProfileHours: React.FC<StoreProfileHoursProps> = ({
  hours, onToggleDay, onUpdateHour, onCopyToAll,
}) => {
  const [picker, setPicker] = useState<TimePickerState>({
    visible: false, day: '', field: 'open', current: '',
  });

  const openPicker = (day: string, field: 'open' | 'close', current: string) => {
    setPicker({ visible: true, day, field, current });
  };

  const closePicker = () => setPicker(p => ({ ...p, visible: false }));

  const selectTime = (time: string) => {
    onUpdateHour(picker.day, picker.field, time);
    closePicker();
  };

  return (
    <View>
      <Text style={SECTION_LABEL_STYLE}>OPERATING HOURS</Text>

      <View style={{ backgroundColor: '#fff' }}>
        {hours.map((hour, idx) => (
          <View
            key={hour.day}
            style={{
              flexDirection: 'row', alignItems: 'center',
              paddingHorizontal: 16, paddingVertical: 12,
              borderBottomWidth: idx < hours.length - 1 ? 1 : 0,
              borderBottomColor: '#F3F4F6',
            }}
          >
            {/* Day + times */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#111' }}>
                {hour.day}
              </Text>
              {hour.isEnabled && (
                <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                  {hour.open} – {hour.close}
                </Text>
              )}
              {!hour.isEnabled && (
                <Text style={{ fontSize: 11, color: '#D1D5DB', marginTop: 2 }}>Closed</Text>
              )}
            </View>

            {/* Toggle + clock */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Switch
                value={hour.isEnabled}
                onValueChange={() => onToggleDay(hour.day)}
                trackColor={{ false: '#E5E7EB', true: '#00C853' }}
                thumbColor="#fff"
                ios_backgroundColor="#E5E7EB"
              />
              <TouchableOpacity
                onPress={() => openPicker(hour.day, 'open', hour.open)}
                disabled={!hour.isEnabled}
              >
                <Feather
                  name="clock"
                  size={14}
                  color={hour.isEnabled ? '#9CA3AF' : '#D1D5DB'}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Copy to all */}
      <TouchableOpacity onPress={onCopyToAll} style={{ padding: 16 }}>
        <Text style={{ fontSize: 12, color: '#00C853', fontWeight: '600', textDecorationLine: 'underline' }}>
          Copy hours to all days
        </Text>
      </TouchableOpacity>

      {/* Simple time picker modal */}
      <Modal
        visible={picker.visible}
        transparent
        animationType="slide"
        onRequestClose={closePicker}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' }}
          activeOpacity={1}
          onPress={closePicker}
        />
        <View style={{
          backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
          padding: 16, maxHeight: 340,
          position: 'absolute', bottom: 0, left: 0, right: 0,
        }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 12, textAlign: 'center' }}>
            {picker.field === 'open' ? 'Opening Time' : 'Closing Time'} — {picker.day}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {TIME_OPTIONS.map(t => (
              <TouchableOpacity
                key={t}
                onPress={() => selectTime(t)}
                style={{
                  paddingVertical: 12, paddingHorizontal: 16,
                  borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
                  backgroundColor: t === picker.current ? '#F0FDF4' : '#fff',
                }}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: t === picker.current ? '700' : '400',
                  color: t === picker.current ? '#00C853' : '#111',
                }}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default StoreProfileHours;