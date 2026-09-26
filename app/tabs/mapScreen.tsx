// screens/MapScreen.tsx
import MapTopBar from "@/components/map/MapTopBar";
import {
  LocateButton,
  SearchThisAreaPill,
  StoreCountPill,
} from "@/components/map/MapFloatingControls";
import StoreBottomSheet from "@/components/map/StoreBottomSheet";
import StoreMarker from "@/components/map/StoreMarker";
import FilterModal from "@/components/search/FilterModal";
import { useMap } from "@/services/hooks/map/useMap";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { StatusBar, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
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
    locationLabel,
    handleGoToCurrentLocation,
    mySizes,
    isOpenNow,
    toggleOpenNow,
    radiusLabel,
    cycleRadius,
    handleSearchThisArea,
  } = useMap();

  const handleLocationPress = async () => {
    await handleGoToCurrentLocation();
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 600);
    }
  };

  const handleListView = () => {
    router.push("/screens/discover/storeListScreen" as any);
  };

  // Top bar renders as a normal (non-absolute) block, so we measure its
  // rough height to position the floating pills relative to the map below it.
  const TOP_BAR_HEIGHT = 168;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />

      <View style={{ paddingTop: insets.top }}>
        <MapTopBar
          locationLabel={locationLabel}
          onLocationPillPress={handleLocationPress}
          query={query}
          onChangeQuery={handleQueryChange}
          onClear={handleClearQuery}
          onFilterPress={handleOpenFilterModal}
          activeFilterCount={activeFilterCount}
          mySizesLabel={mySizes}
          isOpenNow={isOpenNow}
          onToggleOpenNow={toggleOpenNow}
          radiusLabel={radiusLabel}
          onRadiusPress={cycleRadius}
        />
      </View>

      {/* ── Map fills the remaining space ── */}
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
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

        {/* ── "Search this area" pill ── */}
        <SearchThisAreaPill onPress={handleSearchThisArea} top={12} />

        {/* ── Bottom-left store count / list view pill, bottom-right locate button ── */}
        {!selectedStore && (
          <>
            <StoreCountPill count={nearbyCount} onListView={handleListView} bottom={20} />
            <LocateButton onPress={handleLocationPress} isLoading={isFetchingLocation} bottom={20} />
          </>
        )}
      </View>

      {/* ── Bottom sheet ── */}
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