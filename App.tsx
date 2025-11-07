import { StatusBar } from 'expo-status-bar';
import PullToRefreshLoader from 'components/PullToRefresh';
import { Header } from 'components/Header';
import { RefreshableContent } from 'components/RefreshableContent';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import './global.css';

/**
 * Main App component demonstrating the PullToRefresh functionality
 * with an Apple-style header and refreshable content
 */
export default function App() {
  // Shared value to track pull-to-refresh progress (0 to 1)
  const progress = useSharedValue(0);
  
  // State to track if refresh is in progress
  const [refreshing, setRefreshing] = useState(false);
  
  // Trigger height for pull-to-refresh
  const TRIGGER_HEIGHT = 80;
  
  // Sample content items
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'Welcome to Pull-to-Refresh',
      description: 'Pull down on this screen to see the refresh animation in action.',
      timestamp: 'Just now',
    },
    {
      id: '2',
      title: 'Smooth Animations',
      description: 'The circular loader fills up as you pull down, providing visual feedback.',
      timestamp: '2 min ago',
    },
    {
      id: '3',
      title: 'Easy to Use',
      description: 'Simply wrap your content in a ScrollView and use the PullToRefreshLoader.',
      timestamp: '5 min ago',
    },
  ]);

  /**
   * Handle refresh action
   * Simulates fetching new data with a 2-second delay
   */
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate API call or data fetch
    setTimeout(() => {
      // Update items with new timestamp
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          timestamp: 'Just now',
        }))
      );
      setRefreshing(false);
      progress.value = withTiming(0);
    }, 2000);
  };

  // Animated style for the loader positioned above the header
  const loaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.3, 1], [0, 0.5, 1]);
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [-TRIGGER_HEIGHT, 0]
    );
    
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  // Handle scroll events to track pull-to-refresh progress
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const offsetY = event.contentOffset.y;
      
      // Calculate progress based on scroll offset when pulling down
      if (offsetY < 0 && !refreshing) {
        const pullDistance = Math.abs(offsetY);
        const newProgress = Math.min(pullDistance / TRIGGER_HEIGHT, 1);
        progress.value = newProgress;
        
        // Trigger refresh when threshold reached (2 = 200%)
        if (newProgress >= 2 && !refreshing) {
          runOnJS(handleRefresh)();
        }
      }
    },
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Loader displayed above the header during pull */}
        <Animated.View style={[styles.loaderWrapper, loaderStyle]}>
          <PullToRefreshLoader 
            progress={progress} 
            color="black" 
            size={40}
            refreshing={refreshing}
            enableHaptics={true}
          />
        </Animated.View>

        {/* Scrollable content with header and items */}
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          bounces={true}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {/* Apple-style header */}
          <Header 
            title="Pull to Refresh" 
            subtitle="Example Implementation"
          />
          
          {/* Refreshable content */}
          <RefreshableContent items={items} />
        </Animated.ScrollView>
        
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  loaderWrapper: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
