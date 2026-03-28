import { TouchableOpacity, Text, View, ViewStyle, TextStyle } from 'react-native';
import ShowPicture from '@/components/shared/ShowPicture';
import { SvgProps } from 'react-native-svg';

interface SocialButtonProps {
  text: string;
  onPress: () => void;
  SvgIcon?: React.FC<SvgProps>;
  iconSize?: number;
  borderRadius?: number;
  borderColor?: string;
  backgroundColor?: string;
  paddingVertical?: number;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  textColor?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function SocialButton({
  text,
  onPress,
  SvgIcon,
  iconSize = 20,
  borderRadius = 12,
  borderColor = '#D1D5DB',
  backgroundColor = '#FFFFFF',
  paddingVertical = 14,
  fontSize = 15,
  fontWeight = '500',
  textColor = '#1F2937',
  disabled = false,
  containerStyle,
  textStyle,
}: SocialButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor,
          borderRadius,
          backgroundColor,
          paddingVertical,
          opacity: disabled ? 0.5 : 1,
        },
        containerStyle,
      ]}
    >
      {SvgIcon && (
        <View style={{ marginRight: 10 }}>
          <ShowPicture SvgComponent={SvgIcon} width={iconSize} height={iconSize} />
        </View>
      )}
      <Text
        style={[
          { fontSize, fontWeight, color: textColor },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}