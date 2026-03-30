// components/shared/DropdownField.tsx
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface DropdownOption {
  label: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

interface DropdownFieldProps {
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  sheetTitle?: string;
  confirmLabel?: string;
  borderRadius?: number;
  borderColor?: string;
  focusedBorderColor?: string;
  backgroundColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  fontSize?: number;
  placeholderTextColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  error?: string;
}

export default function DropdownField({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  sheetTitle = 'I am a...',
  confirmLabel = 'Confirm',
  borderRadius = 12,
  borderColor = '#D1D5DB',
  focusedBorderColor = '#22C55E',
  backgroundColor = '#FFFFFF',
  paddingVertical = 14,
  paddingHorizontal = 16,
  fontSize = 15,
  placeholderTextColor = '#9CA3AF',
  textColor = '#1F2937',
  containerStyle,
  textStyle,
  disabled = false,
  leftIcon,
  error,
}: DropdownFieldProps) {
  const [open, setOpen] = useState(false);
  // local pending selection before confirm
  const [pending, setPending] = useState<string | null>(value);

  const selected = options.find(o => o.value === value);

  const handleConfirm = () => {
    if (pending) onChange(pending);
    setOpen(false);
  };

  const handleOpen = () => {
    if (disabled) return;
    setPending(value); // reset to current value each time sheet opens
    setOpen(true);
  };

  return (
    <View>
      {/* ── Trigger ── */}
      <TouchableOpacity
        onPress={handleOpen}
        activeOpacity={0.8}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: error ? '#EF4444' : open ? focusedBorderColor : borderColor,
            borderRadius,
            backgroundColor,
            paddingVertical,
            paddingHorizontal,
            opacity: disabled ? 0.5 : 1,
          },
          containerStyle,
        ]}
      >
        {leftIcon && <View style={{ marginRight: 10 }}>{leftIcon}</View>}
        <Text
          style={[
            { flex: 1, fontSize, color: selected ? textColor : placeholderTextColor },
            textStyle,
          ]}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Feather name="chevron-down" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      {error && (
        <Text style={{ fontSize: 12, color: '#EF4444', marginTop: 4, marginLeft: 4 }}>
          {error}
        </Text>
      )}

      {/* ── Bottom Sheet Modal ── */}
      <Modal visible={open} transparent animationType="slide">
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' }}
          onPress={() => setOpen(false)}
          activeOpacity={1}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: 36,
            paddingHorizontal: 20,
            paddingTop: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 16,
          }}
        >
          {/* Drag handle */}
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#D1D5DB',
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />

          {/* Sheet title */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: '#111827',
              marginBottom: 16,
            }}
          >
            {sheetTitle}
          </Text>

          {/* Options */}
          <FlatList
            data={options}
            keyExtractor={item => item.value}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }) => {
              const isSelected = item.value === pending;
              return (
                <TouchableOpacity
                  onPress={() => setPending(item.value)}
                  activeOpacity={0.85}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderColor: isSelected ? focusedBorderColor : '#E5E7EB',
                    borderRadius: 14,
                    backgroundColor: '#FFFFFF',
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    gap: 12,
                  }}
                >
                  {/* Option icon */}
                  {item.icon && (
                    <View
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        backgroundColor: '#F3F4F6',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </View>
                  )}

                  {/* Label + subtitle */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: '#111827',
                      }}
                    >
                      {item.label}
                    </Text>
                    {item.subtitle && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#9CA3AF',
                          marginTop: 2,
                        }}
                      >
                        {item.subtitle}
                      </Text>
                    )}
                  </View>

                  {/* Checkmark */}
                  {isSelected && (
                    <Feather name="check" size={18} color={focusedBorderColor} />
                  )}
                </TouchableOpacity>
              );
            }}
          />

          {/* Confirm button */}
          <TouchableOpacity
            onPress={handleConfirm}
            activeOpacity={0.85}
            style={{
              marginTop: 20,
              backgroundColor: '#111827',
              borderRadius: 14,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pending ? 1 : 0.4,
            }}
            disabled={!pending}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
              {confirmLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}