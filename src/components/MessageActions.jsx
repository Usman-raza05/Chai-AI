import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { COLORS } from '../constants/theme';


export default function MessageActions({
  onCopy,
  onRegenerate,
  onShare,
}) {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={onCopy}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>
          ⧉
        </Text>

        <Text style={styles.text}>
          Copy
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={onRegenerate}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>
          ↻
        </Text>

        <Text style={styles.text}>
          Regenerate
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={onShare}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>
          ↗
        </Text>

        <Text style={styles.text}>
          Share
        </Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',

    marginLeft: 35,

    marginTop: 12,

    gap: 6,
  },


  button: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal: 9,

    paddingVertical: 6,

    borderRadius: 9,
  },


  icon: {
    color: COLORS.muted,

    fontSize: 13,

    marginRight: 5,
  },


  text: {
    color: COLORS.muted,

    fontSize: 9,
  },

});