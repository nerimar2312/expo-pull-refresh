import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

interface RefreshableContentProps {
  items: ContentItem[];
}

/**
 * Example component that displays refreshable content
 * This component shows a list of items that can be refreshed
 */
export function RefreshableContent({ items }: RefreshableContentProps) {
  return (
    <View style={styles.container}>
      {/* Display each item */}
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      ))}

      {/* Empty state when no items */}
      {items.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Pull down to refresh</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#48484A',
    lineHeight: 21,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});

export default RefreshableContent;

