import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Correct placement of import
import type { LockerItem } from '@/services/hooks/profile/useProfile';

interface MyLockerProps {
  items: LockerItem[];
  lockerCount: number;
  lockerPublic: boolean;
  onToggleVisibility: () => void;
  onAddItem?: () => void; // Made optional so we can use internal navigation
  onViewAll: () => void;
}

const MyLocker: React.FC<MyLockerProps> = ({
  items,
  lockerCount,
  lockerPublic,
  onToggleVisibility,
  onAddItem,
  onViewAll,
}) => {
  // 1. Hook MUST be inside the component body
  const router = useRouter();

  // 2. Navigation handler
  const handleAddPress = () => {

     router.push('/screens/profile/lockerScreen');

  };

  return (
    <View
      className="bg-white rounded-3xl mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5 px-5 pt-5">
        <Text className="text-lg font-black text-gray-900 tracking-tight">My Locker</Text>

        <TouchableOpacity
          onPress={onToggleVisibility}
          activeOpacity={0.7}
          className="flex-row items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-100"
        >
          <Feather
            name={lockerPublic ? 'globe' : 'lock'}
            size={14}
            color="#4B5563"
          />
          <Text className="text-xs font-bold text-gray-600">
            {lockerPublic ? 'Public' : 'Private'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Items ScrollView */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        className="mb-4"
      >
        {items.map((item) => (
          <View
            key={item.id}
            className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden border border-gray-50 shadow-sm"
          >
            <Image
              source={{ uri: item.image }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        ))}

        {/* Add button */}
        <TouchableOpacity
          onPress={handleAddPress}
          activeOpacity={0.6}
          className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 items-center justify-center bg-gray-50/50"
        >
          <Feather name="plus" size={28} color="#9CA3AF" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MyLocker;