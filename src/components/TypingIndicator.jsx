import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import COLORS from '../theme/colors';

const TypingIndicator = () => {
  return (
    <View style={styles.container}>

      <View style={styles.icon}>
        <Text style={styles.iconText}>✦</Text>
      </View>

      <View style={styles.bubble}>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 18,
  },

  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  iconText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },

  bubble: {
    backgroundColor: COLORS.aiBubble,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  dots: {
    flexDirection: 'row',
    gap: 5,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textSecondary,
  },
});

export default TypingIndicator;