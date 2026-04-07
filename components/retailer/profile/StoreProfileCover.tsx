import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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
      <View style={{ width: '100%', height: 130, position: 'relative' }}>
        {coverImageUri ? (
          <Image
            source={{ uri: coverImageUri }}
            style={{ width: '100%', height: 130 }}
            resizeMode="cover"
          />
        ) : (
          <View style={{
            width: '100%', height: 130,
            backgroundColor: '#1a1a2e',
            justifyContent: 'center', alignItems: 'center',
          }}>
            <Feather name="image" size={32} color="rgba(255,255,255,0.2)" />
          </View>
        )}

        {/* Camera button */}
        <TouchableOpacity
          onPress={onPickCover}
          style={{
            position: 'absolute', bottom: 8, right: 10,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 14, width: 28, height: 28,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Feather name="camera" size={14} color="#fff" />
        </TouchableOpacity>

        {/* Avatar overlapping bottom edge */}
        <View style={{
          position: 'absolute', bottom: -20, left: 16,
          backgroundColor: '#00C853',
          borderRadius: 24, width: 48, height: 48,
          alignItems: 'center', justifyContent: 'center',
          borderWidth: 3, borderColor: '#fff',
        }}>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '800' }}>
            {avatarLabel}
          </Text>
        </View>
      </View>

      {/* Name + location under cover */}
      <View style={{
        backgroundColor: '#F5F5F5',
        paddingTop: 28, paddingHorizontal: 16, paddingBottom: 10,
      }}>
        <Text style={{ fontSize: 17, fontWeight: '800', color: '#111' }}>{name}</Text>
        <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{location}</Text>
      </View>
    </View>
  );
};

export default StoreProfileCover;