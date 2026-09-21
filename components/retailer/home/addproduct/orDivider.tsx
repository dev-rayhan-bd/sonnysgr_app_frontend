import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrDivider = () => (
  <View style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.text}>OR</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 4,
  },
  line: { flex: 1, height: 1, backgroundColor: '#F3F4F6' },
  text: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', marginHorizontal: 12 },
});

export default OrDivider;