import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedProps,
  interpolate,
  Extrapolation,
  SharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface PullToRefreshLoaderProps {
  progress: SharedValue<number>;
  size?: number;
  strokeWidth?: number;
  color?: string;
  enableHaptics?: boolean;
  refreshing?: boolean;
}

/**
 * Circular progress loader for pull-to-refresh
 * Displays a circular indicator that fills up as the user pulls down
 * Automatically handles haptic feedback based on progress
 */
export default function PullToRefreshLoader({
  progress,
  size = 40,
  strokeWidth = 3,
  color = '#000',
  enableHaptics = true,
  refreshing = false,
}: PullToRefreshLoaderProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // Refs to track haptic feedback triggers
  const hasTriggered100Percent = useRef(false);
  const hasTriggeredRefresh = useRef(false);

  /**
   * Trigger haptic feedback at 100% progress
   * Provides tactile feedback when the loader completes
   */
  const triggerCompleteHaptic = () => {
    if (enableHaptics && !hasTriggered100Percent.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      hasTriggered100Percent.current = true;
    }
  };

  /**
   * Trigger haptic feedback when refresh starts
   * Provides success notification feedback
   */
  const triggerRefreshHaptic = () => {
    if (enableHaptics && !hasTriggeredRefresh.current) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      hasTriggeredRefresh.current = true;
    }
  };

  // Watch progress and trigger haptics automatically
  useAnimatedReaction(
    () => progress.value,
    (currentProgress, previousProgress) => {
      // Trigger haptic at 100% progress
      if (currentProgress >= 1.0 && (previousProgress === null || previousProgress < 1.0)) {
        runOnJS(triggerCompleteHaptic)();
      }
      
      // Trigger haptic at 110% (refresh threshold)
      if (currentProgress >= 1.1 && (previousProgress === null || previousProgress < 1.1)) {
        runOnJS(triggerRefreshHaptic)();
      }
    }
  );

  // Reset haptic triggers when refresh completes
  useEffect(() => {
    if (!refreshing) {
      hasTriggered100Percent.current = false;
      hasTriggeredRefresh.current = false;
    }
  }, [refreshing]);

  // Animated props for the progress circle
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, 0],
      Extrapolation.CLAMP
    );

    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle (empty/transparent) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.2}
        />
        
        {/* Progress circle (fills up) */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          opacity={0.9}
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
