import Toast, { ToastConfig } from 'react-native-toast-message';
import { View, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#22C55E',
        gap: 12,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#F0FDF4',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name="check-circle" size={20} color="#22C55E" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 2 }}>
          {text1}
        </Text>
        {text2 ? (
          <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 18 }}>
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),

  error: ({ text1, text2 }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#EF4444',
        gap: 12,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#FEF2F2',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name="x-circle" size={20} color="#EF4444" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 2 }}>
          {text1}
        </Text>
        {text2 ? (
          <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 18 }}>
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),

  info: ({ text1, text2 }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#4584CA',
        gap: 12,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#EFF6FF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name="info" size={20} color="#4584CA" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 2 }}>
          {text1}
        </Text>
        {text2 ? (
          <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 18 }}>
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),
};

export default function ShowToast() {
  return (
    <Toast
      config={toastConfig}
      position="top"
      topOffset={60}
      visibilityTime={3000}
    />
  );
}