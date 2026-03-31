// app/profilesetup/location.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useLocation } from '@/services/hooks/profilesetup/useLocation'
import Button from '@/components/shared/Button'
import LocationPrivacyNote from '@/components/profilesetup/LocationPrivacyNote'
import ShowPicture from '@/components/shared/ShowPicture'
import LocationIcon from '@/assets/images/profilesetup/location.svg'
import BaseContainer from '@/components/shared/BaseContainer'

export default function LocationScreen() {
  const { loading, handleEnableLocation } = useLocation()

  const onEnable = () => {
    handleEnableLocation(() => router.push('/profilesetup/followStoreScreen'))
  }

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
      <View style={styles.inner}>

        {/* SVG with shadow */}
        <View style={styles.svgShadow}>
          <ShowPicture
            SvgComponent={LocationIcon}
            width={300}
            height={300}
          />
        </View>

        {/* Text content */}
        <View className="items-center px-5 mb-6">
          <Text className="text-[11px] font-bold tracking-widest text-green-500 uppercase mb-2 text-center">
            Almost There
          </Text>

          <Text className="font-black text-gray-900 mb-3 text-center" style={styles.heading}>
            Find sneakers{'\n'}around you
          </Text>

          <Text className="text-sm text-gray-500 text-center mb-5" style={{ lineHeight: 21 }}>
            GoSNKR uses your location to show real-time inventory at stores near you. We never share or sell your location.
          </Text>

          <LocationPrivacyNote />
        </View>

        {/* Footer */}
        <View className="w-full px-5 gap-y-3">
          <Button
            text={loading ? 'Enabling...' : 'Enable Location'}
            onPress={onEnable}
            disabled={loading}
            variant="solid"
            backgroundColor="#22C55E"
            height={56}
            borderRadius={14}
            fontSize={16}
            fontWeight="700"
            opacity={loading ? 0.7 : 1}
            style={{ flex: 0, alignSelf: 'stretch' }}
          />

          <TouchableOpacity
            className="items-center py-1"
            onPress={() => router.push('/')}
            activeOpacity={0.7}
            disabled={loading}
          >
            <Text className="text-[13px] text-gray-400 font-medium">
              Not now, I'll search manually
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  svgShadow: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 36,
    lineHeight: 42,
  },
})