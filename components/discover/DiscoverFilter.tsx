import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { FilterCategory } from '@/services/hooks/discover/useDiscover';
interface DiscoverFilterProps {
  categories: FilterCategory[];
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
  greeting?: string;
  userName?: string;
}

export const DiscoverFilter: React.FC<DiscoverFilterProps> = ({
  categories,
  activeFilter,
  onFilterChange,
  greeting = 'Good morning',
  userName = 'User',
}) => {
  const scaleAnims = useRef(
    categories.reduce((acc, cat) => {
      acc[cat] = new Animated.Value(1);
      return acc;
    }, {} as Record<string, Animated.Value>)
  ).current;

  const handlePress = (cat: FilterCategory) => {
    Animated.sequence([
      Animated.timing(scaleAnims[cat], {
        toValue: 0.93,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[cat], {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
    onFilterChange(cat);
  };

  return (
    <View style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        {greeting}, <Text style={styles.userName}>{userName} 👋</Text>
      </Text>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        {categories.map(cat => {
          const isActive = cat === activeFilter;
          return (
            <Animated.View
              key={cat}
              style={{ transform: [{ scale: scaleAnims[cat] }] }}
            >
              <TouchableOpacity
                style={[styles.pill, isActive && styles.pillActive]}
                onPress={() => handlePress(cat)}
                activeOpacity={0.85}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 15,
    color: '#555',
    fontWeight: '400',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  userName: {
    color: '#1a1a1a',
    fontWeight: '700',
  },
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 8,
    paddingRight: 32,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  pillActive: {
    backgroundColor: '#00D46A',
    borderColor: '#00D46A',
    shadowColor: '#00D46A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  pillTextActive: {
    color: '#fff',
  },
});

export default DiscoverFilter;