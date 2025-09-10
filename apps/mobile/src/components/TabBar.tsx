// packages/mobile/src/components/TabBar.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import { useThemedAssets } from '../hooks/useThemedAssets';

const tabs = [
  { name: 'home', label: 'Home' },
  { name: 'search', label: 'Search' },
  { name: 'scan', label: 'Scan', special: true },
  { name: 'saved', label: 'Saved' },
  { name: 'profile', label: 'Profile' },
];

export const TabBar: React.FC = () => {
  const { colors } = useThemedAssets();
  const [activeTab, setActiveTab] = React.useState('home');

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          style={[
            styles.tab,
            tab.special && styles.specialTab,
          ]}
          onPress={() => setActiveTab(tab.name)}
        >
          <Icon
            name={tab.name as any}
            size={tab.special ? 32 : 24}
            color={
              tab.special
                ? colors.secondary
                : activeTab === tab.name
                  ? colors.primary
                  : '#999'
            }
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
