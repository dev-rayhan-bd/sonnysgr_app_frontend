import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  text: string;
  onPress: () => void;
  variant?: 'solid' | 'outline';
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  disabled?: boolean;
  opacity?: number;
  width?: number | string;
  height?: number;
  useGradient?: boolean;
  gradientColors?: [string, string, ...string[]];
  shadowColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  text,
  onPress,
  variant = 'solid',
  backgroundColor = '#4A90D9',
  textColor,
  borderColor = '#D1D5DB',
  borderWidth = 1,
  borderRadius = 12,
  paddingVertical = 16,
  paddingHorizontal = 24,
  fontSize = 16,
  fontWeight = '600',
  disabled = false,
  opacity = 1,
  width,
  height,
  useGradient = false,
  gradientColors = ['#4584CA', '#2360A5'],
  shadowColor = '#000000',
  style,
  textStyle,
}: ButtonProps) {
  const isOutline = variant === 'outline';

  const shadowStyle: ViewStyle = useGradient
    ? {
        shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      }
    : {};

  const textContent = (
    <Text
      style={[
        {
          fontSize,
          fontWeight,
          color: textColor ?? (isOutline ? '#4B5563' : '#FFFFFF'),
        },
        textStyle,
      ]}
    >
      {text}
    </Text>
  );

  if (useGradient && !isOutline) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={[
          {
            flex: width ? 0 : 1,
            width: width as number | undefined,
            height,
            borderRadius,
            overflow: 'hidden',
            opacity: disabled ? 0.5 : opacity,
          },
          shadowStyle,
          style,
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            paddingVertical,
            paddingHorizontal,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {textContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        {
          flex: width ? 0 : 1,
          width: width as number | undefined,
          height,
          borderRadius,
          paddingVertical,
          paddingHorizontal,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isOutline ? 'transparent' : backgroundColor,
          borderWidth: isOutline ? borderWidth : 0,
          borderColor: isOutline ? borderColor : 'transparent',
          opacity: disabled ? 0.5 : opacity,
        },
        shadowStyle,
        style,
      ]}
    >
      {textContent}
    </TouchableOpacity>
  );
}