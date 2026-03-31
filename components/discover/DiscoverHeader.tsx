import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DiscoverHeaderProps {
  notificationCount?: number;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
}

export const DiscoverHeader: React.FC<DiscoverHeaderProps> = ({
  notificationCount = 2, 
  onNotificationPress,
  onAvatarPress,
}) => {
  return (
    <View 
      className={`flex-row items-center justify-between px-6 bg-white border-b border-gray-100 ${
        Platform.OS === 'ios' ? 'pt-[60px]' : 'pt-[40px]'
      }`}
      style={{ paddingBottom: 16 }}
    >
      {/* Brand Logo - Bigger and bolder as requested, matching image colors */}
      <Text className="text-3xl font-black">
        <Text className="text-black">GO</Text>
        <Text className="text-[#36B161]">SNKR</Text>
      </Text>

      <View className="flex-row items-center space-x-5">
        
        {/* Notification Bell - Larger, exactly like the image */}
        <TouchableOpacity
          onPress={onNotificationPress}
          activeOpacity={0.7}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          className="relative items-center justify-center w-10 h-10"
        >
          {/* Sizing increased for visibility on modern screens */}
          <Ionicons name="notifications-outline" size={32} color="#1C1C1E" />
          {notificationCount > 0 && (
            // Larger, bolder red dot exactly matching the image's positioning
            <View 
              className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#ED4F4F] rounded-full border-[2.5px] border-white shadow-sm"
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAvatarPress}
          activeOpacity={0.75}
          className="items-center justify-center"
        >
          <View 
            className="w-18 h-18 rounded-full border-[2px] border-[#36B161] items-center justify-center bg-[#F1F3F5] shadow-sm"
          >
            {/* Person outline icon, slightly larger to match new circle size */}
            <Ionicons name="person-outline" size={30} color="#727981" />
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default DiscoverHeader;