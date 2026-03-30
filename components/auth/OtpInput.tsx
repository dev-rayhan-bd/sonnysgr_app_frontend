import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, TextInput } from "react-native";

export interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onChange?: (digits: string[]) => void;
  autoFocusOnMount?: boolean;
}

export interface OTPInputHandle {
  reset: () => void;
  focus: () => void;
}

const OTPInput = forwardRef<OTPInputHandle, OTPInputProps>(
  ({ length = 6, onComplete, onChange, autoFocusOnMount = true }, ref) => {
    const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
    const [focusIndex, setFocusIndex] = useState<number>(0);
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setDigits(Array(length).fill(""));
        setFocusIndex(0);
        setTimeout(() => inputRefs.current[0]?.focus(), 50);
      },
      focus: () => {
        inputRefs.current[focusIndex]?.focus();
      },
    }));

    useEffect(() => {
      if (autoFocusOnMount) {
        setTimeout(() => inputRefs.current[0]?.focus(), 300);
      }
    }, []);

    const handleChangeText = (value: string, index: number) => {
      const char = value.slice(-1);

      if (char === "") {
        const updated = [...digits];
        updated[index] = "";
        setDigits(updated);
        onChange?.(updated);
        const prev = index - 1;
        if (prev >= 0) {
          setFocusIndex(prev);
          inputRefs.current[prev]?.focus();
        }
        return;
      }

      if (!/\d/.test(char)) return;

      const updated = [...digits];
      updated[index] = char;
      setDigits(updated);
      onChange?.(updated);

      const next = index + 1;
      if (next < length) {
        setFocusIndex(next);
        inputRefs.current[next]?.focus();
      } else {
        setFocusIndex(index);
        onComplete?.(updated.join(""));
      }
    };

    const handleKeyPress = (e: any, index: number) => {
      if (e.nativeEvent.key === "Backspace" && digits[index] === "") {
        const prev = index - 1;
        if (prev >= 0) {
          const updated = [...digits];
          updated[prev] = "";
          setDigits(updated);
          onChange?.(updated);
          setFocusIndex(prev);
          inputRefs.current[prev]?.focus();
        }
      }
    };

    return (
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {digits.map((digit, i) => {
          const isFocus = focusIndex === i;
          const hasDigit = digit !== "";

          return (
            <TextInput
              key={i}
              ref={(r) => { inputRefs.current[i] = r; }}
              style={{
                width: 48,
                height: 56,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: isFocus ? '#22C55E' : hasDigit ? '#22C55E' : '#D1D5DB',
                backgroundColor: isFocus ? '##E6F1EE' : '#FFFFFF',
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 'bold',
                color: '#1F2937',
                padding: 0,
              }}
              value={digit}
              onChangeText={(val) => handleChangeText(val, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              onFocus={() => setFocusIndex(i)}
              maxLength={2}
              keyboardType="number-pad"
              autoComplete="one-time-code"
              importantForAutofill="yes"
              selectionColor="#4584CA"
            />
          );
        })}
      </View>
    );
  },
);

OTPInput.displayName = "OTPInput";
export default OTPInput;