import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface PasswordFieldProps {
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

export default function PasswordField({
  value,
  onChangeText,
  placeholder = 'Password',
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
}: PasswordFieldProps) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

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
        <Feather name="lock" size={18} color="#000" style={{ marginRight: 10 }} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={!visible}
          autoCapitalize="none"
          editable={!disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[{ flex: 1, fontSize, color: textColor, padding: 0 }, inputStyle]}
        />
        <TouchableOpacity onPress={() => setVisible(prev => !prev)} activeOpacity={0.7}>
          <Feather
            name={visible ? 'eye' : 'eye-off'}
            size={18}
            color={visible ? '#000' : '#9CA3AF'}
          />
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={{ fontSize: 12, color: '#EF4444', marginTop: 4, marginLeft: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}