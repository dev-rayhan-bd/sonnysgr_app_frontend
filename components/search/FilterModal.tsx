// components/search/FilterModal.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import {
  BRAND_OPTIONS,
  DEFAULT_FILTERS,
  SearchFilters,
  SIZE_OPTIONS,
  SizeOption,
  STORE_OPTIONS,
} from "@/services/hooks/search/useSearch";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const GREEN = "#22C55E";
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.82;

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionTitle = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 12,
      fontWeight: "700",
      color: "#8A8A9A",
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 12,
      marginTop: 24,
    }}
  >
    {title}
  </Text>
);

interface PillProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const Pill = ({ label, selected, onPress }: PillProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={{
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: 100,
      backgroundColor: selected ? GREEN : "#F5F5F7",
      borderWidth: 1.5,
      borderColor: selected ? GREEN : "transparent",
      marginRight: 8,
      marginBottom: 10,
    }}
  >
    <Text
      style={{
        fontSize: 14,
        fontWeight: "600",
        color: selected ? "#FFFFFF" : "#3A3A4A",
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// ─── Main component ───────────────────────────────────────────────────────────

interface FilterModalProps {
  visible: boolean;
  initialFilters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
  onClose: () => void;
}

const FilterModal = ({
  visible,
  initialFilters,
  onApply,
  onClose,
}: FilterModalProps) => {
  const [draft, setDraft] = useState<SearchFilters>(initialFilters);

  useEffect(() => {
    if (visible) setDraft(initialFilters);
  }, [visible, initialFilters]);

  const setSize = useCallback(
    (size: SizeOption) => setDraft((d) => ({ ...d, size })),
    [],
  );

  const toggleBrand = useCallback(
    (brand: string) =>
      setDraft((d) => ({
        ...d,
        brands: d.brands.includes(brand)
          ? d.brands.filter((b) => b !== brand)
          : [...d.brands, brand],
      })),
    [],
  );

  const toggleStore = useCallback(
    (store: string) =>
      setDraft((d) => ({
        ...d,
        stores: d.stores.includes(store)
          ? d.stores.filter((s) => s !== store)
          : [...d.stores, store],
      })),
    [],
  );

  const handleReset = useCallback(() => setDraft(DEFAULT_FILTERS), []);

  const activeCount =
    (draft.size !== "Default" ? 1 : 0) +
    draft.brands.length +
    draft.stores.length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* ── Blurred backdrop — tap to dismiss ──────────────────────────── */}
      <TouchableWithoutFeedback onPress={onClose}>
        <BlurView
          intensity={40}
          tint="dark"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </TouchableWithoutFeedback>

      {/* ── Bottom sheet ────────────────────────────────────────────────── */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: SHEET_HEIGHT,
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          overflow: "hidden",
        }}
      >
        {/* Drag handle */}
        <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
          <View
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#E0E0EA",
            }}
          />
        </View>

        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: "#F0F0F5",
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="x" size={22} color="#0F0F0F" />
          </TouchableOpacity>

          <Text style={{ fontSize: 17, fontWeight: "700", color: "#0F0F0F" }}>
            Filters
          </Text>

          <TouchableOpacity
            onPress={handleReset}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#8A8A9A" }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable body */}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Size — single select */}
          <SectionTitle title="Size" />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {SIZE_OPTIONS.map((s) => (
              <Pill
                key={s}
                label={s}
                selected={draft.size === s}
                onPress={() => setSize(s)}
              />
            ))}
          </View>

          {/* Brand — multi select */}
          <SectionTitle title="Brand" />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {BRAND_OPTIONS.map((b) => (
              <Pill
                key={b}
                label={b}
                selected={draft.brands.includes(b)}
                onPress={() => toggleBrand(b)}
              />
            ))}
          </View>

          {/* Store — multi select */}
          <SectionTitle title="Store" />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {STORE_OPTIONS.map((s) => (
              <Pill
                key={s}
                label={s}
                selected={draft.stores.includes(s)}
                onPress={() => toggleStore(s)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Sticky Apply button */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 36,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#F0F0F5",
          }}
        >
          <TouchableOpacity
            onPress={() => onApply(draft)}
            activeOpacity={0.85}
            style={{
              height: 54,
              borderRadius: 14,
              backgroundColor: GREEN,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#FFFFFF" }}>
              Apply Filters
            </Text>
            {activeCount > 0 && (
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: "#FFFFFF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "700", color: GREEN }}
                >
                  {activeCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;