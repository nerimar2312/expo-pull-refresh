# Pull-to-Refresh Component

A React Native circular progress loader component with built-in haptic feedback for pull-to-refresh interactions.

## Installation

```bash
npm install
```

## Usage

```typescript
import PullToRefreshLoader from 'components/PullToRefresh';
import Animated, { useSharedValue, useAnimatedScrollHandler, runOnJS } from 'react-native-reanimated';
import { useState } from 'react';

function MyApp() {
  const progress = useSharedValue(0);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Fetch data...
    setTimeout(() => setRefreshing(false), 2000);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (event.contentOffset.y < 0 && !refreshing) {
        progress.value = Math.min(Math.abs(event.contentOffset.y) / 80, 1);
        if (progress.value >= 1.1) runOnJS(handleRefresh)();
      }
    },
  });

  return (
    <View>
      <PullToRefreshLoader 
        progress={progress} 
        refreshing={refreshing}
        color="black"
      />
      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
        {/* Your content */}
      </Animated.ScrollView>
    </View>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `SharedValue<number>` | **required** | Progress value (0-1) |
| `refreshing` | `boolean` | `false` | Current refresh state |
| `enableHaptics` | `boolean` | `true` | Enable haptic feedback |
| `color` | `string` | `'#000'` | Loader color |
| `size` | `number` | `40` | Loader size in pixels |
| `strokeWidth` | `number` | `3` | Circle stroke width |

## Features

- ⚡ **Automatic Haptics**: Triggers at 100% and 110% progress
- 🎨 **Customizable**: Color, size, and haptic intensity
- 📱 **Cross-platform**: iOS, Android, Web
- 🚀 **60fps**: Built with Reanimated

## License

MIT