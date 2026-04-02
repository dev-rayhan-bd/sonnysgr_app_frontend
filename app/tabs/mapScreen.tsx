// screens/MapScreen.tsx
import MapSearchBar from "@/components/map/MapSearchBar";
import StoreBottomSheet from "@/components/map/StoreBottomSheet";
import StoreMarker from "@/components/map/StoreMarker";
import FilterModal from "@/components/search/FilterModal";
import { Store, useMap } from "@/services/hooks/map/useMap";
import React, { useRef } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const {
    query,
    handleQueryChange,
    handleClearQuery,
    filters,
    activeFilterCount,
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleApplyFilters,
    region,
    setRegion,
    filteredStores,
    nearbyCount,
    selectedStore,
    handleSelectStore,
    handleCloseStore,
    handleToggleFollow,
    isFetchingLocation,
    handleGoToCurrentLocation,
  } = useMap();

  const handleLocationPress = async () => {
    await handleGoToCurrentLocation();
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 600);
    }
  };

  const handleSelectSuggestion = (store: Store) => {
    handleClearQuery();
    mapRef.current?.animateToRegion(
      {
        latitude: store.latitude,
        longitude: store.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      },
      600,
    );
    handleSelectStore(store);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      {/* ── Full-screen map ── */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        onPress={handleClearQuery}
      >
        {filteredStores.map((store) => (
          <StoreMarker
            key={store.id}
            store={store}
            isSelected={selectedStore?.id === store.id}
            onPress={handleSelectStore}
          />
        ))}
      </MapView>

      {/* ── Search bar ── */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 12,
          left: 16,
          right: 16,
          zIndex: 20,
        }}
      >
        <MapSearchBar
          value={query}
          onChangeText={handleQueryChange}
          onClear={handleClearQuery}
          onFilterPress={handleOpenFilterModal}
          onLocationPress={handleLocationPress}
          onSelectSuggestion={handleSelectSuggestion}
          suggestions={filteredStores}
          activeFilterCount={activeFilterCount}
          isFetchingLocation={isFetchingLocation}
        />
      </View>

      {/* ── Nearby pill ── */}
      {!selectedStore && (
        <View
          style={{ position: "absolute", left: 16, bottom: 110, zIndex: 5 }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: "#0F0F0F",
                textAlign: "center",
              }}
            >
              {nearbyCount}
            </Text>
            <Text style={{ fontSize: 11, color: "#8A8A9A", marginTop: 1 }}>
              stores{"\n"}nearby
            </Text>
          </View>
        </View>
      )}

      {/* ── Zoom controls ── */}
      {!selectedStore && (
        <View
          style={{
            position: "absolute",
            right: 16,
            bottom: 110,
            zIndex: 5,
            gap: 1,
          }}
        >
          {["+", "−"].map((symbol) => (
            <TouchableOpacity
              key={symbol}
              activeOpacity={0.8}
              onPress={() => {
                const delta = symbol === "+" ? 0.5 : 2;
                mapRef.current?.animateToRegion(
                  {
                    ...region,
                    latitudeDelta: region.latitudeDelta / delta,
                    longitudeDelta: region.longitudeDelta / delta,
                  },
                  300,
                );
              }}
              style={{
                width: 44,
                height: 44,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: symbol === "+" ? 12 : 0,
                borderTopRightRadius: symbol === "+" ? 12 : 0,
                borderBottomLeftRadius: symbol === "−" ? 12 : 0,
                borderBottomRightRadius: symbol === "−" ? 12 : 0,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "#0F0F0F",
                  fontWeight: "300",
                  lineHeight: 26,
                }}
              >
                {symbol}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ── Bottom sheet — rendered DIRECTLY in root View, no wrapper ──
            This is critical: the old <View pointerEvents="box-none"> wrapper
            had no height, so StoreBottomSheet's absolute children were
            positioning against a 0-height box, breaking scroll and tap-to-close. ── */}
      {selectedStore && (
        <StoreBottomSheet
          store={selectedStore}
          onClose={handleCloseStore}
          onToggleFollow={handleToggleFollow}
        />
      )}

      {/* ── Filter modal ── */}
      <FilterModal
        visible={isFilterModalOpen}
        initialFilters={filters}
        onApply={handleApplyFilters}
        onClose={handleCloseFilterModal}
      />
    </View>
  );
};

export default MapScreen;