// components/profilesetup/CustomSizeModal.tsx
import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native'
import type { GenderTab } from '@/services/hooks/profilesetup/useSizeSelection'

interface Props {
  visible: boolean
  activeTab: GenderTab
  onConfirm: (size: string) => void
  onClose: () => void
  title?: string
  subtitle?: (tab: GenderTab) => string
  placeholder?: string
  confirmText?: string
  errorText?: string
}

export default function CustomSizeModal({
  visible,
  activeTab,
  onConfirm,
  onClose,
  title = 'Add Custom Size',
  subtitle = (tab) => `Enter your ${tab} shoe size below`,
  placeholder = 'e.g. 10.5 or 11W',
  confirmText = 'Add Size',
  errorText = 'Please enter a size',
}: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleConfirm = () => {
    const trimmed = value.trim()
    if (!trimmed) {
      setError(errorText)
      return
    }
    onConfirm(trimmed)
    setValue('')
    setError('')
    onClose()
  }

  const handleClose = () => {
    setValue('')
    setError('')
    onClose()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <View style={styles.card}>
                {/* Header */}
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>
                  {subtitle(activeTab)}
                </Text>

                {/* Input */}
                <TextInput
                  style={[styles.input, !!error && styles.inputError]}
                  placeholder={placeholder}
                  placeholderTextColor="#9CA3AF"
                  value={value}
                  onChangeText={text => {
                    setValue(text)
                    if (error) setError('')
                  }}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleConfirm}
                />
                {!!error && <Text style={styles.errorText}>{error}</Text>}

                {/* Actions */}
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={handleClose}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={handleConfirm}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.confirmText}>{confirmText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginBottom: 8,
    marginLeft: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#111827',
  },
  confirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
})
