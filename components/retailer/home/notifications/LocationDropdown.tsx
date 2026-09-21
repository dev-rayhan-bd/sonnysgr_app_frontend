import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props<T extends string> {
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}

function LocationDropdown<T extends string>({ value, options, onChange }: Props<T>) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
        style={styles.pill}
      >
        <Feather name="map-pin" size={14} color="#374151" />
        <Text style={styles.pillText}>{value}</Text>
        <Feather name="chevron-down" size={14} color="#374151" />
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            {options.map((opt, i) => {
              const selected = opt === value;
              return (
                <TouchableOpacity
                  key={opt}
                  activeOpacity={0.7}
                  onPress={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  style={[styles.option, i > 0 && styles.optionBorder]}
                >
                  <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                    {opt}
                  </Text>
                  {selected && <Feather name="check" size={16} color="#00C853" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  pillText: { fontSize: 13, fontWeight: '600', color: '#111' },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-start',
    paddingTop: 150,
    paddingHorizontal: 16,
  },
  menu: {
    alignSelf: 'flex-start',
    minWidth: 200,
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionBorder: { borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  optionText: { fontSize: 14, fontWeight: '500', color: '#111' },
  optionTextSelected: { fontWeight: '700' },
});

export default LocationDropdown;