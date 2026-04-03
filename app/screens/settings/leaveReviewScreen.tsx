import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLeaveReview } from '@/services/hooks/settings/useLeaveReview';
import { RatingRow, StarRating } from '@/components/settings/Rating';
import BaseContainer from '@/components/shared/BaseContainer';

const LeaveReviewScreen = () => {
  const router = useRouter();
  const { 
    ratings, experience, setExperience, 
    isAnonymous, setIsAnonymous, updateRating, 
    handleSubmit, loading 
  } = useLeaveReview();

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="pt-10"> 
        {/* Simplified Header: Only Back Button and Title */}
        <View className="flex-row items-center px-5 py-4 bg-white border-b border-gray-100">
          <TouchableOpacity 
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-1 items-center mr-6">
            <Text className="text-lg font-bold text-gray-900">Leave a Review</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
          {/* Store Info Card */}
          <View className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center">
                  <Text className="font-bold text-gray-900">SK</Text>
                </View>
                <View>
                  <Text className="font-bold text-gray-900">Sonny's Kicks</Text>
                  <Text className="text-xs text-gray-400">123 Main St, Downtown</Text>
                </View>
              </View>
              <View className="bg-green-50 px-2 py-1 rounded-md flex-row items-center">
                <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                <Text className="text-[10px] text-green-600 font-bold ml-1">Verified Purchase</Text>
              </View>
            </View>
            <View className="items-center py-2 border-t border-gray-50">
              <Text className="text-xs text-gray-400 mb-1">Reviewing pickup from:</Text>
              <Text className="text-sm font-semibold text-center">Air Jordan 4 'Black Cat' - Size 10.5 - Mar 21</Text>
            </View>
          </View>

          {/* Overall Rating */}
          <View className="items-center mb-8">
            <Text className="text-base font-bold text-gray-800 mb-3">Overall Rating</Text>
            <StarRating 
              rating={ratings.overall} 
              onRatingChange={(val) => updateRating('overall', val)} 
              size={38} 
            />
          </View>

          {/* Aspect Ratings */}
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Rate specific aspects:</Text>
          
          {/* Ensure labels and icons are handled correctly inside the RatingRow component */}
          <RatingRow label="Customer Service" icon="⭐" rating={ratings.customerService} onRatingChange={(v) => updateRating('customerService', v)} />
          <RatingRow label="Authenticity / Trust" icon="✅" rating={ratings.authenticity} onRatingChange={(v) => updateRating('authenticity', v)} />
          <RatingRow label="Pricing Fairness" icon="💰" rating={ratings.pricing} onRatingChange={(v) => updateRating('pricing', v)} />
          <RatingRow label="Store Experience" icon="🏪" rating={ratings.storeExperience} onRatingChange={(v) => updateRating('storeExperience', v)} />
          <RatingRow label="Staff Helpfulness" icon="👤" rating={ratings.staffHelpfulness} onRatingChange={(v) => updateRating('staffHelpfulness', v)} />
          <RatingRow label="Pickup Speed" icon="⚡" rating={ratings.pickupSpeed} onRatingChange={(v) => updateRating('pickupSpeed', v)} />

          {/* Experience Text Area */}
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-3 ml-1">Share your experience</Text>
          <View className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <TextInput
              multiline
              placeholder="How was the experience? Was the pair authentic? How was the pickup process?"
              className="text-sm text-gray-700 h-32"
              textAlignVertical="top"
              value={experience}
              onChangeText={setExperience}
              maxLength={500}
            />
            <Text className="text-right text-[10px] text-gray-300">{experience.length}/500</Text>
          </View>

          {/* Photo Upload Placeholder */}
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-3 ml-1">Add photos (optional)</Text>
          <TouchableOpacity className="w-20 h-20 bg-white border border-dashed border-gray-300 rounded-2xl items-center justify-center">
            <Feather name="camera" size={24} color="#D1D5DB" />
            <Text className="text-[10px] text-gray-400 mt-1">Add</Text>
          </TouchableOpacity>

          {/* Anonymous Toggle */}
          <View className="flex-row items-center justify-between bg-white border border-gray-100 rounded-2xl p-4 mt-8 shadow-sm">
            <View className="flex-row items-center gap-3">
              <Ionicons name="person" size={20} color="#4B5563" />
              <View>
                <Text className="font-bold text-gray-800">Post anonymously</Text>
                <Text className="text-[10px] text-gray-400">Your username won't be shown with this review</Text>
              </View>
            </View>
            <Switch 
              value={isAnonymous} 
              onValueChange={setIsAnonymous}
              trackColor={{ false: '#E5E7EB', true: '#000' }}
            />
          </View>

          {/* Main Submit Button (Kept as primary action) */}
          <TouchableOpacity 
            onPress={() => handleSubmit(() => router.back())}
            className={`w-full py-4 rounded-2xl mt-10 mb-10 items-center ${loading ? 'bg-gray-200' : 'bg-black'}`}
            disabled={loading}
          >
            <Text className="text-white font-bold text-lg">
              {loading ? 'Submitting...' : 'Submit Review'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>    
    </BaseContainer>
  );
};

export default LeaveReviewScreen;