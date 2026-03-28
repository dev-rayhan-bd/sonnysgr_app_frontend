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
}

interface DropdownFieldProps {
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
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
  borderRadius = 12,
  borderColor = '#D1D5DB',
  focusedBorderColor = '#4584CA',
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

  const selected = options.find(o => o.value === value);

  return (
    <View>
      <TouchableOpacity
        onPress={() => !disabled && setOpen(true)}
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
            {
              flex: 1,
              fontSize,
              color: selected ? textColor : placeholderTextColor,
            },
            textStyle,
          ]}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Feather name={open ? 'chevron-up' : 'chevron-down'} size={18} color="#000" />
      </TouchableOpacity>

      {error && (
        <Text style={{ fontSize: 12, color: '#EF4444', marginTop: 4, marginLeft: 4 }}>
          {error}
        </Text>
      )}

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
          onPress={() => setOpen(false)}
          activeOpacity={1}
        >
          <View
            style={{
              margin: 32,
              marginTop: 'auto',
              marginBottom: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              overflow: 'hidden',
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
            }}
          >
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    backgroundColor: item.value === value ? '#F0F4FF' : '#FFFFFF',
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                  }}
                >
                  <Text style={{
                    fontSize,
                    color: item.value === value ? '#4584CA' : textColor,
                    fontWeight: item.value === value ? '600' : '400',
                  }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}