import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Interactive Star Component
export const StarRating = ({ 
  rating, 
  onRatingChange, 
  size = 24 
}: { 
  rating: number, 
  onRatingChange: (val: number) => void, 
  size?: number 
}) => (
  <View className="flex-row gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
        <FontAwesome 
          name={star <= rating ? "star" : "star-o"} 
          size={size} 
          color={star <= rating ? "#FFD700" : "#D1D5DB"} 
        />
      </TouchableOpacity>
    ))}
  </View>
);

// Aspect Rating Row
export const RatingRow = ({ 
  label, 
  icon, 
  rating, 
  onRatingChange 
}: { 
  label: string, 
  icon: string, 
  rating: number, 
  onRatingChange: (val: number) => void 
}) => (
  <View className="flex-row items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-2 shadow-sm">
    <View className="flex-row items-center gap-3">
      <Text style={{ fontSize: 18 }}>{icon}</Text>
      <Text className="text-[14px] font-semibold text-gray-700">{label}</Text>
    </View>
    <StarRating rating={rating} onRatingChange={onRatingChange} size={18} />
  </View>
);