import { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface TextFieldProps extends TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  error?: string;
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
}

export default function TextField({
  placeholder = '',
  value,
  onChangeText,
  leftIcon,
  rightIcon,
  label,
  error,
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
  ...rest
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={containerStyle}>

      {/* Label */}
      {label && (
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#374151',
          marginBottom: 6,
        }}>
          {label}
        </Text>
      )}

      {/* Input Row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: error ? '#EF4444' : focused ? focusedBorderColor : borderColor,
          borderRadius,
          backgroundColor,
          paddingVertical,
          paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* Left Icon */}
        {leftIcon && (
          <View style={{ marginRight: 10 }}>
            {leftIcon}
          </View>
        )}

        {/* Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          editable={!disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            {
              flex: 1,
              fontSize,
              color: textColor,
              padding: 0,
              margin: 0,
            },
            inputStyle,
          ]}
          {...rest}
        />

        {/* Right Icon */}
        {rightIcon && (
          <View style={{ marginLeft: 10 }}>
            {rightIcon}
          </View>
        )}
      </View>

      {/* Error */}
      {error && (
        <Text style={{
          fontSize: 12,
          color: '#EF4444',
          marginTop: 4,
        }}>
          {error}
        </Text>
      )}

    </View>
  );
}