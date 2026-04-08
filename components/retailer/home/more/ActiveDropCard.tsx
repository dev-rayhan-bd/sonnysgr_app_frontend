import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export const ActiveDropCard = ({ timeLeft }: { timeLeft: any }) => (
  <View style={s.blackCard}>
    <Text style={s.statusText}>DROP IN PROGRESS 🔥</Text>
    <View style={s.imgContainer}>
       <Image source={{ uri: 'https://placeholder.com/100' }} style={s.shoeImg} />
    </View>
    <Text style={s.shoeName}>Air Jordan 4 'Black Cat'</Text>
    <Text style={s.timer}>
      {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
    </Text>
    <Text style={s.timerSub}>Until drop goes live</Text>

    <View style={s.statsRow}>
      <View style={s.statItem}><Text style={s.statNum}>47</Text><Text style={s.statLab}>waitlisted</Text></View>
      <View style={s.statItem}><Text style={[s.statNum, { color: '#F59E0B' }]}>Gold+</Text><Text style={s.statLab}>VIP only 1hr</Text></View>
      <View style={s.statItem}><Text style={s.statNum}>12</Text><Text style={s.statLab}>available</Text></View>
    </View>

    <View style={s.btnRow}>
      <TouchableOpacity style={s.btn}><Text style={s.btnText}>Edit Drop</Text></TouchableOpacity>
      <TouchableOpacity style={s.btn}><Text style={s.btnText}>Cancel Drop</Text></TouchableOpacity>
    </View>
  </View>
);

const s = StyleSheet.create({
  blackCard: { backgroundColor: '#111', borderRadius: 24, padding: 24, alignItems: 'center' },
  statusText: { color: '#10B981', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  imgContainer: { width: 100, height: 100, backgroundColor: '#1A1A1A', borderRadius: 20, marginVertical: 20, justifyContent: 'center', alignItems: 'center' },
  shoeImg: { width: 80, height: 50, transform: [{ rotate: '-15deg' }] },
  shoeName: { color: '#fff', fontSize: 20, fontWeight: '800' },
  timer: { color: '#fff', fontSize: 48, fontWeight: '900', marginVertical: 4 },
  timerSub: { color: '#6B7280', fontSize: 12 },
  statsRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 30, borderTopWidth: 1, borderTopColor: '#222', paddingTop: 20 },
  statItem: { alignItems: 'center', flex: 1 },
  statNum: { color: '#fff', fontSize: 18, fontWeight: '800' },
  statLab: { color: '#4B5563', fontSize: 10, marginTop: 4 },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
  btn: { flex: 1, backgroundColor: '#222', height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 13, fontWeight: '700' }
});