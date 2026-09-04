import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { COLORS } from '../constants/theme';


export default function ThinkingIndicator() {

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.logo}>

          <Text style={styles.logoText}>
            C
          </Text>

        </View>


        <Text style={styles.name}>
          CHAI
        </Text>

      </View>


      <View style={styles.dots}>

        <View style={styles.dot} />

        <View style={styles.dot} />

        <View style={styles.dot} />

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    marginBottom: 28,
  },


  header: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 9,
  },


  logo: {
    width: 27,
    height: 27,

    borderRadius: 9,

    backgroundColor:
      COLORS.blue,

    alignItems: 'center',

    justifyContent: 'center',

    marginRight: 8,
  },


  logoText: {
    color: '#FFFFFF',

    fontSize: 12,

    fontWeight: '800',
  },


  name: {
    color: COLORS.blueLight,

    fontSize: 10,

    fontWeight: '800',

    letterSpacing: 1.5,
  },


  dots: {
    flexDirection: 'row',

    marginLeft: 35,

    paddingTop: 5,
  },


  dot: {
    width: 5,
    height: 5,

    borderRadius: 3,

    backgroundColor:
      COLORS.blue,

    marginRight: 5,

    opacity: 0.7,
  },

});