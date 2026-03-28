import { useState } from 'react';
import { View, Text, TextInput, TextStyle, ViewStyle } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface EmailFieldProps {
  value: string;
  onChangeText: (text: string) => void;
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
  inputStyle?: TextStyle;
  disabled?: boolean;
  error?: string;
}

export default function EmailField({
  value,
  onChangeText,
  placeholder = 'Email Address',
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
  inputStyle,
  disabled = false,
  error,
}: EmailFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: error ? '#EF4444' : focused ? focusedBorderColor : borderColor,
            borderRadius,
            backgroundColor,
            paddingVertical,
            paddingHorizontal,
            opacity: disabled ? 0.5 : 1,
          },
          containerStyle,
        ]}
      >
        <Feather name="mail" size={18} color="#000" style={{ marginRight: 10 }} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[{ flex: 1, fontSize, color: textColor, padding: 0 }, inputStyle]}
        />
      </View>
      {error && (
        <Text style={{ fontSize: 12, color: '#EF4444', marginTop: 4, marginLeft: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}