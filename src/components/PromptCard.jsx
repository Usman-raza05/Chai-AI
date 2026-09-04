import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { COLORS } from '../constants/theme';


export default function PromptCard({
  item,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        onPress(item.prompt)
      }
      activeOpacity={0.7}
    >

      <View style={styles.icon}>
        <Text style={styles.iconText}>
          {item.icon}
        </Text>
      </View>


      <View>
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.subtitle}>
          {item.subtitle}
        </Text>
      </View>

    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({

  card: {
    width: '48.5%',

    minHeight: 70,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 16,

    paddingHorizontal: 12,

    paddingVertical: 11,

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 9,
  },


  icon: {
    width: 31,
    height: 31,

    borderRadius: 10,

    backgroundColor:
      COLORS.surface2,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: 'center',

    justifyContent: 'center',

    marginRight: 9,
  },


  iconText: {
    color: COLORS.blueLight,
    fontSize: 15,
  },


  title: {
    color: COLORS.white,

    fontSize: 12,

    fontWeight: '700',
  },


  subtitle: {
    color: COLORS.muted,

    fontSize: 10,

    marginTop: 2,
  },

});