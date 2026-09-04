import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';

import COLORS from '../theme/colors';


const SettingsScreen = ({
  visible,
  onClose,
}) => {

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >

      <View style={styles.container}>

        {/* ==========================================
            HEADER
        ========================================== */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>
              ‹
            </Text>
          </TouchableOpacity>


          <View style={styles.headerTitleContainer}>

            <Text style={styles.headerTitle}>
              Settings
            </Text>

            <Text style={styles.headerSubtitle}>
              Customize your Chai AI experience
            </Text>

          </View>

        </View>


        {/* ==========================================
            CONTENT
        ========================================== */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {/* ========================================
              PROFILE
          ======================================== */}

          <Text style={styles.sectionTitle}>
            GENERAL
          </Text>

          <View style={styles.card}>

            <View style={styles.settingIcon}>
              <Text style={styles.settingIconText}>
                ☕
              </Text>
            </View>

            <View style={styles.settingInfo}>

              <Text style={styles.settingTitle}>
                Chai AI
              </Text>

              <Text style={styles.settingDescription}>
                Your personal AI assistant
              </Text>

            </View>

          </View>


          {/* ========================================
              AI MODEL
          ======================================== */}

          <Text style={styles.sectionTitle}>
            AI ASSISTANT
          </Text>

          <View style={styles.card}>

            <View style={styles.settingIcon}>

              <Text style={styles.settingIconText}>
                ✦
              </Text>

            </View>

            <View style={styles.settingInfo}>

              <Text style={styles.settingTitle}>
                AI Model
              </Text>

              <Text style={styles.settingDescription}>
                Chai AI intelligent assistant
              </Text>

            </View>

            <View style={styles.valueBadge}>

              <Text style={styles.valueText}>
                Active
              </Text>

            </View>

          </View>


          {/* ========================================
              APPEARANCE
          ======================================== */}

          <Text style={styles.sectionTitle}>
            APPEARANCE
          </Text>

          <View style={styles.card}>

            <View style={styles.settingIcon}>

              <Text style={styles.settingIconText}>
                ◐
              </Text>

            </View>

            <View style={styles.settingInfo}>

              <Text style={styles.settingTitle}>
                Theme
              </Text>

              <Text style={styles.settingDescription}>
                Warm dark chai theme
              </Text>

            </View>

            <View style={styles.valueBadge}>

              <Text style={styles.valueText}>
                Chai
              </Text>

            </View>

          </View>


          {/* ========================================
              ABOUT
          ======================================== */}

          <Text style={styles.sectionTitle}>
            ABOUT
          </Text>

          <View style={styles.card}>

            <View style={styles.settingIcon}>

              <Text style={styles.settingIconText}>
                ℹ
              </Text>

            </View>

            <View style={styles.settingInfo}>

              <Text style={styles.settingTitle}>
                Chai AI
              </Text>

              <Text style={styles.settingDescription}>
                Your premium AI assistant
              </Text>

            </View>

            <Text style={styles.versionText}>
              V1.0
            </Text>

          </View>


          {/* ========================================
              DISCLAIMER
          ======================================== */}

          <View style={styles.footer}>

            <Text style={styles.footerTitle}>
              ☕ Made for better conversations
            </Text>

            <Text style={styles.footerText}>
              Chai AI can make mistakes. Always verify
              important information.
            </Text>

          </View>

        </ScrollView>

      </View>

    </Modal>
  );
};


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor:
      COLORS.bg,

  },


  // ====================================================
  // HEADER
  // ====================================================

  header: {

    height: 76,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 16,
    paddingTop: 20,
    borderBottomWidth: 1,

    borderBottomColor:
      COLORS.border,

    backgroundColor:
      COLORS.surface,

  },


  backButton: {

    width: 42,

    height: 42,

    borderRadius: 13,

    backgroundColor:
      COLORS.surfaceLight,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,

  },


  backIcon: {

    color:
      COLORS.white,

    fontSize: 32,

    lineHeight: 34,

    marginTop: -3,

  },


  headerTitleContainer: {

    flex: 1,

  },


  headerTitle: {

    color:
      COLORS.white,

    fontSize: 18,

    fontWeight: '800',

  },


  headerSubtitle: {

    color:
      COLORS.textMuted,

    fontSize: 11,

    marginTop: 2,

  },


  // ====================================================
  // CONTENT
  // ====================================================

  content: {

    paddingHorizontal: 16,

    paddingTop: 22,

    paddingBottom: 35,

  },


  sectionTitle: {

    color:
      COLORS.textMuted,

    fontSize: 10,

    fontWeight: '800',

    letterSpacing: 1.2,

    marginTop: 18,

    marginBottom: 9,

    paddingLeft: 4,

  },


  // ====================================================
  // CARD
  // ====================================================

  card: {

    minHeight: 66,

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 16,

    paddingHorizontal: 12,

    paddingVertical: 11,

    marginBottom: 8,

  },


  settingIcon: {

    width: 42,

    height: 42,

    borderRadius: 13,

    backgroundColor:
      '#F4E7D0',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,

  },


  settingIconText: {

    color:
      '#6B4528',

    fontSize: 19,

    fontWeight: '700',

  },


  settingInfo: {

    flex: 1,

  },


  settingTitle: {

    color:
      COLORS.text,

    fontSize: 14,

    fontWeight: '700',

  },


  settingDescription: {

    color:
      COLORS.textMuted,

    fontSize: 11,

    marginTop: 3,

  },


  // ====================================================
  // BADGE
  // ====================================================

  valueBadge: {

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 9,

    backgroundColor:
      COLORS.surfaceLight,

    borderWidth: 1,

    borderColor:
      COLORS.border,

  },


  valueText: {

    color:
      COLORS.primaryLight,

    fontSize: 10,

    fontWeight: '700',

  },


  versionText: {

    color:
      COLORS.textMuted,

    fontSize: 10,

    fontWeight: '600',

  },


  // ====================================================
  // FOOTER
  // ====================================================

  footer: {

    alignItems: 'center',

    paddingTop: 30,

    paddingHorizontal: 20,

  },


  footerTitle: {

    color:
      COLORS.primaryLight,

    fontSize: 12,

    fontWeight: '700',

    textAlign: 'center',

  },


  footerText: {

    color:
      COLORS.textMuted,

    fontSize: 10,

    lineHeight: 16,

    textAlign: 'center',

    marginTop: 7,

  },

});


export default SettingsScreen;