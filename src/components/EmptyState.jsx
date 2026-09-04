import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import COLORS from '../theme/colors';

import chaiLogo from '../assets/chai-ai-logo.png';


const EmptyState = () => {

  return (

    <View style={styles.container}>

      {/* ==========================================
          CHAI AI LOGO
      ========================================== */}

      <View style={styles.logoContainer}>

        <Image
          source={chaiLogo}
          style={styles.logo}
          resizeMode="contain"
        />

      </View>


      {/* ==========================================
          TITLE
      ========================================== */}

      <Text style={styles.title}>
        How can I help?
      </Text>


      {/* ==========================================
          SUBTITLE
      ========================================== */}

      <Text style={styles.subtitle}>
        Ask anything. Explore ideas, solve problems,
        write code, or simply have a conversation.
      </Text>

    </View>

  );

};


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    paddingHorizontal: 35,

    marginTop: -40,

  },


  // ====================================================
  // LOGO
  // ====================================================

  logoContainer: {

    width: 76,

    height: 76,

    borderRadius: 22,

    backgroundColor: '#F4E7D0',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 22,

    overflow: 'hidden',

    borderWidth: 1,

    borderColor: '#C99A4A',

  },


  logo: {

    width: '115%',

    height: '115%',

  },


  // ====================================================
  // TITLE
  // ====================================================

  title: {

    color: '#FFF8ED',

    fontSize: 27,

    fontWeight: '800',

    marginBottom: 10,

  },


  // ====================================================
  // SUBTITLE
  // ====================================================

  subtitle: {

    color: '#C8B8A5',

    textAlign: 'center',

    fontSize: 14,

    lineHeight: 21,

  },

});


export default EmptyState;