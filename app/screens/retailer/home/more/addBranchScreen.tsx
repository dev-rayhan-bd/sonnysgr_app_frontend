import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BaseContainer from '@/components/shared/BaseContainer';
import { useAddBranch } from '@/services/hooks/retailer/home/useAddBranch';

export default function AddBranchScreen() {
  const {
    form,
    setField,
    inventoryMode,
    setInventoryMode,
    handleSave,
    handleAddPhoto,
    handleSetupCustomPickup,
  } = useAddBranch();

  return (
    <BaseContainer backgroundColor="#fff" scrollable>
      <View className="pt-10 flex-1 pb-10">
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Add Branch</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={s.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Photo Upload */}
        <TouchableOpacity style={s.photoBox} onPress={handleAddPhoto}>
          <Feather name="camera" size={28} color="#9CA3AF" />
          <Text style={s.photoLabel}>Add branch photo</Text>
        </TouchableOpacity>

        {/* Branch Details */}
        <View style={s.sectionLabel}>
          <Text style={s.sectionLabelText}>BRANCH DETAILS</Text>
        </View>

        <View style={s.inputGroup}>
          <TextInput
            style={s.input}
            placeholder="e.g. Main Street Location"
            placeholderTextColor="#9CA3AF"
            value={form.name}
            onChangeText={(v) => setField('name', v)}
          />
          <View style={s.divider} />
          <View style={s.inputRow}>
            <Feather name="map-pin" size={16} color="#9CA3AF" style={s.inputIcon} />
            <TextInput
              style={s.inputFlex}
              placeholder="Address"
              placeholderTextColor="#9CA3AF"
              value={form.address}
              onChangeText={(v) => setField('address', v)}
            />
          </View>
          <View style={s.divider} />
          <View style={s.inputRow}>
            <Feather name="phone" size={16} color="#9CA3AF" style={s.inputIcon} />
            <TextInput
              style={s.inputFlex}
              placeholder="+1 (305) 555-0198"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(v) => setField('phone', v)}
            />
          </View>
        </View>

        {/* Branch Settings */}
        <View style={s.sectionLabel}>
          <Text style={s.sectionLabelText}>BRANCH SETTINGS</Text>
        </View>

        <View style={s.settingsGroup}>
          <SettingRow
            icon={<MaterialCommunityIcons name="shopping" size={18} color="#111" />}
            label="Accept In-App Orders"
            value={form.acceptOrders}
            onToggle={(v) => setField('acceptOrders', v)}
          />
          <View style={s.divider} />
          <SettingRow
            icon={<MaterialCommunityIcons name="lock-outline" size={18} color="#111" />}
            label="Accept Hold with Deposit"
            value={form.acceptDeposit}
            onToggle={(v) => setField('acceptDeposit', v)}
          />
          <View style={s.divider} />
          <SettingRow
            icon={<MaterialCommunityIcons name="map-marker-outline" size={18} color="#111" />}
            label="In-Store Pickup Available"
            value={form.pickupAvailable}
            onToggle={(v) => setField('pickupAvailable', v)}
          />
          <View style={s.divider} />
          <View style={s.settingRow}>
            <View style={s.settingLeft}>
              <MaterialCommunityIcons name="clock-outline" size={18} color="#111" />
              <Text style={s.settingLabel}>Custom Pickup Rules</Text>
            </View>
            <TouchableOpacity onPress={handleSetupCustomPickup}>
              <Text style={s.setupText}>Set up →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Inventory */}
        <View style={s.sectionLabel}>
          <Text style={s.sectionLabelText}>INVENTORY</Text>
        </View>

        <View style={s.inventoryGroup}>
          <TouchableOpacity
            style={[s.inventoryOption, inventoryMode === 'shared' && s.inventoryOptionSelected]}
            onPress={() => setInventoryMode('shared')}
          >
            <View style={s.inventoryLeft}>
              <MaterialCommunityIcons
                name="earth"
                size={20}
                color={inventoryMode === 'shared' ? '#10B981' : '#9CA3AF'}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={s.inventoryTitle}>Share inventory with all branches</Text>
                <Text style={s.inventorySub}>Products sync across locations</Text>
              </View>
            </View>
            {inventoryMode === 'shared' && (
              <Feather name="check" size={16} color="#10B981" />
            )}
          </TouchableOpacity>

          <View style={s.divider} />

          <TouchableOpacity
            style={[s.inventoryOption, inventoryMode === 'separate' && s.inventoryOptionSelected]}
            onPress={() => setInventoryMode('separate')}
          >
            <View style={s.inventoryLeft}>
              <MaterialCommunityIcons
                name="store-outline"
                size={20}
                color={inventoryMode === 'separate' ? '#10B981' : '#9CA3AF'}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={s.inventoryTitle}>Separate inventory for this branch</Text>
                <Text style={s.inventorySub}>Recommended for distinct branches</Text>
              </View>
            </View>
            {inventoryMode === 'separate' && (
              <Feather name="check" size={16} color="#10B981" />
            )}
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={s.saveBtn} onPress={handleSave}>
          <Text style={s.saveBtnText}>Save Branch</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  );
}

function SettingRow({
  icon,
  label,
  value,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <View style={s.settingRow}>
      <View style={s.settingLeft}>
        {icon}
        <Text style={s.settingLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E5E7EB', true: '#10B981' }}
        thumbColor="#fff"
      />
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '900' },
  saveText: { fontSize: 14, fontWeight: '800', color: '#10B981' },

  photoBox: {
    margin: 16,
    height: 110,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  photoLabel: { color: '#9CA3AF', fontSize: 12, marginTop: 8 },

  sectionLabel: { paddingHorizontal: 16, marginTop: 8, marginBottom: 6 },
  sectionLabelText: { fontSize: 10, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1 },

  inputGroup: {
    marginHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingVertical: 4,
    marginBottom: 16,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#111',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputIcon: { marginRight: 10 },
  inputFlex: { flex: 1, fontSize: 14, color: '#111' },

  settingsGroup: {
    marginHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingVertical: 4,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  settingLabel: { fontSize: 14, fontWeight: '600', color: '#111' },
  setupText: { fontSize: 13, fontWeight: '700', color: '#10B981' },

  inventoryGroup: {
    marginHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingVertical: 4,
    marginBottom: 24,
  },
  inventoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inventoryOptionSelected: { backgroundColor: '#F0FDF4' },
  inventoryLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  inventoryTitle: { fontSize: 13, fontWeight: '700', color: '#111' },
  inventorySub: { fontSize: 11, color: '#6B7280', marginTop: 2 },

  divider: { height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 16 },

  saveBtn: {
    marginHorizontal: 16,
    backgroundColor: '#111',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '900' },
});