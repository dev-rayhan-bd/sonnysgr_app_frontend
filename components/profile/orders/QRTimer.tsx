// components/store/QRTimer.tsx
import React from 'react'
import { View, Text } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

interface Props {
  display: string
  progress: number
}

const SIZE   = 72
const STROKE = 4
const RADIUS = (SIZE - STROKE) / 2
const CIRCUM = 2 * Math.PI * RADIUS

const QRTimer: React.FC<Props> = ({ display, progress }) => {
  // Calculate strokeDashoffset as a plain number — no shared values
  const strokeDashoffset = CIRCUM * (1 - progress)

  return (
    <View style={{ width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE}>
        {/* Track circle */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#333"
          strokeWidth={STROKE}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#22C55E"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUM}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>

      {/* Centered text */}
      <View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 13, fontWeight: '800' }}>
          {display}
        </Text>
      </View>
    </View>
  )
}

export default QRTimer