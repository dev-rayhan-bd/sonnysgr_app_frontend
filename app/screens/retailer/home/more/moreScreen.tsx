import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useDashboard } from '@/services/hooks/retailer/home/useMore';
import { DashboardItem } from '@/components/retailer/home/more/MoreItem';
import BaseContainer from '@/components/shared/BaseContainer';
export default function MoreScreen() {
  const { storeInfo, menuItems, handlePress } = useDashboard();

  return (
<BaseContainer backgroundColor='#fff'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.brandText}>GoSNKR</Text>
          <Text style={styles.subBrandText}>Store Dashboard</Text>
        </View>

        {/* Store Location Badge */}
        <View style={styles.locationBadge}>
          <Text style={styles.locationText}>
            {storeInfo.name} · {storeInfo.location}
          </Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <DashboardItem 
              key={item.id} 
              item={item} 
              onPress={handlePress} 
            />
          ))}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
</BaseContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 16,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -0.5,
  },
  subBrandText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
    marginTop: 2,
  },
  locationBadge: {
    backgroundColor: '#F0FDF4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginBottom: 24,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#166534',
  },
  menuContainer: {
    flex: 1,
  },
});