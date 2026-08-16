// app/screens/messages/chatScreen.tsx
import React, { useState, useRef } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'

interface Message {
  id: string
  text: string
  fromMe: boolean
  time: string
  type?: 'text' | 'offer' | 'system'
  offerAmount?: number
  offerStatus?: 'pending' | 'accepted' | 'declined'
}

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Hi! Is the Air Jordan 1 still available?', fromMe: true, time: '9:10 AM', type: 'text' },
  { id: '2', text: 'Yes it is! Size 10.5, brand new with box.', fromMe: false, time: '9:12 AM', type: 'text' },
  { id: '3', text: '', fromMe: true, time: '9:14 AM', type: 'offer', offerAmount: 190, offerStatus: 'pending' },
  { id: '4', text: 'I can\'t go lower than $205. It\'s a fair price.', fromMe: false, time: '9:20 AM', type: 'text' },
]

export default function ChatScreen() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState('')
  const flatListRef = useRef<FlatList>(null)

  const sendMessage = () => {
    if (!inputText.trim()) return
    const newMsg: Message = {
      id: String(Date.now()),
      text: inputText.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    }
    setMessages(prev => [...prev, newMsg])
    setInputText('')
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100)
  }

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.type === 'offer') {
      return (
        <View style={[styles.offerBubble, item.fromMe ? styles.offerBubbleMe : styles.offerBubbleThem]}>
          <Text style={styles.offerLabel}>Offer Sent</Text>
          <Text style={styles.offerAmount}>${item.offerAmount}</Text>
          <View style={[styles.offerStatusBadge,
            item.offerStatus === 'accepted' ? styles.offerAccepted
            : item.offerStatus === 'declined' ? styles.offerDeclined
            : styles.offerPending
          ]}>
            <Text style={styles.offerStatusText}>
              {item.offerStatus === 'pending' ? '⏳ Pending' : item.offerStatus === 'accepted' ? '✓ Accepted' : '✗ Declined'}
            </Text>
          </View>
        </View>
      )
    }

    return (
      <View style={[styles.messageRow, item.fromMe ? styles.messageRowMe : styles.messageRowThem]}>
        {!item.fromMe && <View style={styles.senderAvatar}><Text style={styles.senderAvatarText}>MK</Text></View>}
        <View>
          <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleThem]}>
            <Text style={[styles.bubbleText, item.fromMe && styles.bubbleTextMe]}>{item.text}</Text>
          </View>
          <Text style={[styles.msgTime, item.fromMe && styles.msgTimeMe]}>{item.time}</Text>
        </View>
      </View>
    )
  }

  return (
    <BaseContainer backgroundColor="#fff">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#0a0a0a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerCenter} onPress={() => router.push('/screens/reseller/resellerProfileScreen' as any)}>
          <View style={styles.headerAvatar}><Text style={styles.headerAvatarText}>MK</Text></View>
          <View>
            <Text style={styles.headerName}>marcus_kicks</Text>
            <Text style={styles.headerStatus}>Active now</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Product context */}
      <View style={styles.productContext}>
        <View style={styles.contextImage} />
        <View style={styles.contextInfo}>
          <Text style={styles.contextName}>Air Jordan 1 Retro High OG</Text>
          <Text style={styles.contextMeta}>Size 10.5 · $220</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/screens/product/productScreen')}>
          <Text style={styles.viewProduct}>View</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={m => m.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          renderItem={renderMessage}
        />

        {/* Offer quick action */}
        <TouchableOpacity
          style={styles.makeOfferBar}
          onPress={() => router.push('/screens/reseller/sendOfferScreen' as any)}
        >
          <Feather name="tag" size={14} color="#374151" />
          <Text style={styles.makeOfferText}>Make an Offer</Text>
        </TouchableOpacity>

        {/* Input */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachBtn}>
            <Feather name="paperclip" size={20} color="#9ca3af" />
          </TouchableOpacity>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message..."
            placeholderTextColor="#9ca3af"
            style={styles.textInput}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Feather name="send" size={18} color={inputText.trim() ? '#fff' : '#9ca3af'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  headerAvatarText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  headerName: { fontSize: 15, fontWeight: '700', color: '#0a0a0a' },
  headerStatus: { fontSize: 12, color: '#22c55e' },
  productContext: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, backgroundColor: '#f9fafb', marginHorizontal: 16, marginTop: 8, borderRadius: 14 },
  contextImage: { width: 44, height: 44, backgroundColor: '#e5e7eb', borderRadius: 10 },
  contextInfo: { flex: 1 },
  contextName: { fontSize: 13, fontWeight: '600', color: '#0a0a0a' },
  contextMeta: { fontSize: 12, color: '#6b7280' },
  viewProduct: { fontSize: 13, fontWeight: '600', color: '#22c55e' },
  messageList: { paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  messageRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  messageRowMe: { justifyContent: 'flex-end' },
  messageRowThem: { justifyContent: 'flex-start' },
  senderAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#374151', alignItems: 'center', justifyContent: 'center' },
  senderAvatarText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  bubble: { maxWidth: 260, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  bubbleMe: { backgroundColor: '#0a0a0a', borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: '#f3f4f6', borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, color: '#0a0a0a', lineHeight: 20 },
  bubbleTextMe: { color: '#fff' },
  msgTime: { fontSize: 10, color: '#9ca3af', marginTop: 4 },
  msgTimeMe: { textAlign: 'right' },
  offerBubble: { alignSelf: 'center', backgroundColor: '#f9fafb', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center', gap: 6, minWidth: 180 },
  offerBubbleMe: {},
  offerBubbleThem: {},
  offerLabel: { fontSize: 12, color: '#6b7280' },
  offerAmount: { fontSize: 28, fontWeight: '800', color: '#0a0a0a' },
  offerStatusBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  offerPending: { backgroundColor: '#fffbeb' },
  offerAccepted: { backgroundColor: '#f0fdf4' },
  offerDeclined: { backgroundColor: '#fef2f2' },
  offerStatusText: { fontSize: 12, fontWeight: '700', color: '#374151' },
  makeOfferBar: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f3f4f6', marginHorizontal: 16, marginBottom: 6, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  makeOfferText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#f3f4f6', backgroundColor: '#fff' },
  attachBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  textInput: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: '#0a0a0a', maxHeight: 100 },
  sendBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: '#f3f4f6' },
})
