// screens/SearchScreen.tsx
import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

import { useSearch } from "@/services/hooks/search/useSearch";
import BaseContainer from "@/components/shared/BaseContainer";
import SearchHeader from "@/components/search/SearchHeader";
import SearchInput from "@/components/search/SearchInput";
import FilterModal from "@/components/search/FilterModal";
import TrendingList from "@/components/search/TrendingList";
import RecentSearches from "@/components/search/RecentSearches";
import SearchResults from "@/components/search/SearchResults";

const SearchScreen = () => {
  const router = useRouter();

  const {
    // query
    query,
    isSearchActive,
    handleQueryChange,
    handleClearQuery,
    handleSubmitSearch,

    // filters
    filters,
    activeFilterCount,
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleApplyFilters,

    // trending
    trendingItems,
    handleSelectTrending,

    // recent
    recentSearches,
    handleSelectRecent,
    handleRemoveRecent,
    handleClearAllRecent,

    // results
    results,
    isFetching,
    isError,
  } = useSearch();

  const handleSelectResult = (item: any) => {
    if (item.fullName) {
      router.push("/");
    } else {
      router.push("/");
    }
  };

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="px-6 pt-10">

        {/* ── Header ── */}
        <SearchHeader />

        {/* ── Search input (filter icon replaces mic) ── */}
        <SearchInput
          value={query}
          onChangeText={handleQueryChange}
          onSubmitEditing={handleSubmitSearch}
          onClear={handleClearQuery}
          onFilterPress={handleOpenFilterModal}
          activeFilterCount={activeFilterCount}
          isFetching={isFetching}
        />

        {/* ── Conditional content ── */}
        {isSearchActive ? (
          <SearchResults
            results={results}
            isFetching={isFetching}
            isError={isError}
            query={query}
            onSelectItem={handleSelectResult}
          />
        ) : (
          <>
            <TrendingList
              items={trendingItems}
              onSelect={handleSelectTrending}
            />
            <RecentSearches
              items={recentSearches}
              onSelect={handleSelectRecent}
              onRemove={handleRemoveRecent}
              onClearAll={handleClearAllRecent}
            />
          </>
        )}
      </View>

      {/* ── Filter modal ── */}
      <FilterModal
        visible={isFilterModalOpen}
        initialFilters={filters}
        onApply={handleApplyFilters}
        onClose={handleCloseFilterModal}
      />
    </BaseContainer>
  );
};

export default SearchScreen;