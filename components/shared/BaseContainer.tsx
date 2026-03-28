import {
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BaseContainerProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  backgroundColor?: string;
}

export default function BaseContainer({
  children,
  className = '',
  scrollable = false,
  backgroundColor,
}: BaseContainerProps) {
  const insets = useSafeAreaInsets();

  if (scrollable) {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom }}
        style={{ flex: 1, backgroundColor: backgroundColor ?? 'transparent' }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={20}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }

  return (
    <View
      className={`flex-1 ${className}`}
      style={{
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: backgroundColor ?? 'transparent',
      }}
    >
      {children}
    </View>
  );
}