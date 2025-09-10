// packages/mobile/src/screens/Scanner/QRScannerOverlay.tsx
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';

export const QRScannerOverlay: React.FC = () => {
  const scanLineAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* Dark overlay with transparent center */}
      <Svg style={StyleSheet.absoluteFillObject}>
        <Path
          d="M0,0 L100%,0 L100%,100% L0,100% Z
             M20%,35% L80%,35% L80%,65% L20%,65% Z"
          fill="rgba(0,0,0,0.6)"
        />
      </Svg>

      {/* Corner markers */}
      <View style={styles.corners}>
        <Svg width="100%" height="100%">
          {/* Top-left corner */}
          <Path
            d="M20,35 L20,40 M20,35 L25,35"
            stroke="#F5A623"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Add other corners... */}
        </Svg>
      </View>

      {/* Animated scan line */}
      <Animated.View
        style={[
          styles.scanLine,
          {
            transform: [
              {
                translateY: scanLineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 100],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};
