import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * Apple-style header component with large title
 * Features a minimalist design similar to iOS headers
 */
export function Header({ title, subtitle }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* Large title - Apple style */}
        <Text style={styles.title}>{title}</Text>
        
        {/* Optional subtitle */}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      {/* Subtle divider line */}
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    letterSpacing: 0.35,
    color: '#000000',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#8E8E93',
    marginTop: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#C6C6C8',
  },
});

export default Header;

