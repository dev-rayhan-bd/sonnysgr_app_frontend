import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface StoreProfileCoverProps {
  coverImageUri?: string;
  avatarLabel: string;
  name: string;
  location: string;
  onPickCover?: () => void;
}

const StoreProfileCover: React.FC<StoreProfileCoverProps> = ({
  coverImageUri,
  avatarLabel,
  name,
  location,
  onPickCover,
}) => {
  return (
    <View>
      {/* Cover */}
      <View style={styles.coverWrapper}>
        {coverImageUri ? (
          <Image
            source={{ uri: coverImageUri }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.coverPlaceholder}>
            <Feather name="image" size={32} color="rgba(255,255,255,0.2)" />
          </View>
        )}

        {/* Camera button */}
        <TouchableOpacity onPress={onPickCover} style={styles.cameraBtn}>
          <Feather name="camera" size={14} color="#fff" />
        </TouchableOpacity>

        {/* Avatar — overlapping bottom edge, with green ring */}
        <View style={styles.avatarRing}>
          <View style={styles.avatarInner}>
            <Text style={styles.avatarText}>{avatarLabel}</Text>
          </View>
        </View>
      </View>

      {/* Name + location under cover */}
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

const AVATAR_SIZE = 52;
const RING_SIZE = AVATAR_SIZE + 6; // 3px ring on each side

const styles = StyleSheet.create({
coverWrapper: {
  width: '100%',
  height: 130,
  position: 'relative',
  overflow: 'visible',   // ← ADD THIS
  zIndex: 1,             // ← ADD THIS
},

  coverImage: {
    width: '100%',
    height: 130,
  },
  coverPlaceholder: {
    width: '100%',
    height: 130,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

avatarRing: {
  position: 'absolute',
  bottom: -(RING_SIZE / 2),
  left: 14,
  width: RING_SIZE,
  height: RING_SIZE,
  borderRadius: RING_SIZE / 2,
  backgroundColor: '#00C853',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,             // ← ADD THIS so it sits above both cover and info
},

  // Dark inner circle
  avatarInner: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#111',          // dark/black background like in image
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

// 2. Increase paddingTop in infoWrapper so avatar isn't hidden behind it
infoWrapper: {
  backgroundColor: '#fff',
  paddingTop: 36,        // ← increase from 32 to 36 (half of RING_SIZE ~29 + some gap)
  paddingHorizontal: 16,
  paddingBottom: 10,
  zIndex: 0,             // ← ADD THIS
},
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111',
  },
  location: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
});

export default StoreProfileCover;