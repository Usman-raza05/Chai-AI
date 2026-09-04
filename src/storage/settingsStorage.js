import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';

import COLORS from '../theme/colors';

import {
  getSettings,
  saveSettings,
  resetSettings,
} from '../storage/settingsStorage';


const SettingsScreen = ({ onBack }) => {

  const [settings, setSettings] = useState({
    soundEnabled: true,
    hapticEnabled: true,
    sendWithEnter: false,
    autoScroll: true,
  });


  // ======================================================
  // LOAD SETTINGS
  // ======================================================

  useEffect(() => {

    loadSettings();

  }, []);


  const loadSettings = async () => {

    try {

      const saved =
        await getSettings();

      if (saved) {

        setSettings(
          current => ({
            ...current,
            ...saved,
          })
        );

      }

    } catch (error) {

      console.log(
        'Load settings error:',
        error
      );

    }

  };


  // ======================================================
  // UPDATE SETTING
  // ======================================================

  const updateSetting = async (
    key,
    value
  ) => {

    try {

      const updated = {

        ...settings,

        [key]: value,

      };


      setSettings(
        updated
      );


      await saveSettings(
        updated
      );

    } catch (error) {

      console.log(
        'Save setting error:',
        error
      );

    }

  };


  // ======================================================
  // RESET SETTINGS
  // ======================================================

  const handleReset = () => {

    Alert.alert(
      'Reset Settings',
      'Are you sure you want to restore all settings to default?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Reset',
          style: 'destructive',

          onPress: async () => {

            try {

              const defaults =
                await resetSettings();

              setSettings(
                defaults
              );

            } catch (error) {

              console.log(
                'Reset settings error:',
                error
              );

            }

          },

        },

      ]
    );

  };


  // ======================================================
  // SETTING ROW
  // ======================================================

  const SettingSwitch = ({
    title,
    description,
    settingKey,
  }) => (

    <View
      style={styles.settingRow}
    >

      <View
        style={styles.settingInfo}
      >

        <Text
          style={styles.settingTitle}
        >
          {title}
        </Text>

        <Text
          style={styles.settingDescription}
        >
          {description}
        </Text>

      </View>


      <Switch
        value={
          !!settings[settingKey]
        }
        onValueChange={
          value =>
            updateSetting(
              settingKey,
              value
            )
        }
        trackColor={{
          false:
            COLORS.border,
          true:
            COLORS.primary,
        }}
        thumbColor={
          COLORS.white
        }
      />

    </View>

  );


  // ======================================================
  // RENDER
  // ======================================================

  return (

    <View
      style={styles.container}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <View
        style={styles.header}
      >

        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >

          <Text
            style={styles.backIcon}
          >
            ‹
          </Text>

        </TouchableOpacity>


        <Text
          style={styles.headerTitle}
        >
          Settings
        </Text>


        <View
          style={styles.headerSpacer}
        />

      </View>


      {/* =================================================
          CONTENT
      ================================================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >

        {/* =================================================
            GENERAL
        ================================================= */}

        <Text
          style={styles.sectionTitle}
        >
          GENERAL
        </Text>


        <View
          style={styles.section}
        >

          <SettingSwitch
            title="Sound"
            description="Play sounds for chat interactions"
            settingKey="soundEnabled"
          />


          <View
            style={styles.separator}
          />


          <SettingSwitch
            title="Haptic Feedback"
            description="Use vibration feedback for actions"
            settingKey="hapticEnabled"
          />


          <View
            style={styles.separator}
          />


          <SettingSwitch
            title="Send with Enter"
            description="Send messages when pressing Enter"
            settingKey="sendWithEnter"
          />


          <View
            style={styles.separator}
          />


          <SettingSwitch
            title="Auto Scroll"
            description="Automatically scroll to new messages"
            settingKey="autoScroll"
          />

        </View>


        {/* =================================================
            ABOUT
        ================================================= */}

        <Text
          style={styles.sectionTitle}
        >
          ABOUT
        </Text>


        <View
          style={styles.section}
        >

          <View
            style={styles.aboutRow}
          >

            <View>

              <Text
                style={styles.aboutTitle}
              >
                Nova
              </Text>

              <Text
                style={styles.aboutDescription}
              >
                AI Chat Assistant
              </Text>

            </View>


            <Text
              style={styles.version}
            >
              V13
            </Text>

          </View>

        </View>


        {/* =================================================
            RESET
        ================================================= */}

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.75}
        >

          <Text
            style={styles.resetText}
          >
            Reset Settings
          </Text>

        </TouchableOpacity>


        <Text
          style={styles.footer}
        >
          Nova can make mistakes. Check important information.
        </Text>

      </ScrollView>

    </View>

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

    height: 64,

    paddingHorizontal: 16,

    flexDirection:
      'row',

    alignItems:
      'center',

    borderBottomWidth:
      1,

    borderBottomColor:
      COLORS.border,

  },


  backButton: {

    width: 40,

    height: 40,

    borderRadius: 12,

    justifyContent:
      'center',

    alignItems:
      'center',

  },


  backIcon: {

    color:
      COLORS.white,

    fontSize: 34,

    lineHeight: 36,

    marginTop:
      -4,

  },


  headerTitle: {

    flex: 1,

    color:
      COLORS.white,

    fontSize: 20,

    fontWeight:
      '800',

    marginLeft: 8,

  },


  headerSpacer: {

    width: 40,

  },


  // ====================================================
  // CONTENT
  // ====================================================

  content: {

    padding: 16,

    paddingBottom: 40,

  },


  sectionTitle: {

    color:
      COLORS.textMuted,

    fontSize: 11,

    fontWeight:
      '800',

    letterSpacing:
      1.2,

    marginTop: 12,

    marginBottom: 8,

    marginLeft: 4,

  },


  section: {

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 16,

    overflow: 'hidden',

  },


  // ====================================================
  // SETTING ROW
  // ====================================================

  settingRow: {

    minHeight: 70,

    paddingHorizontal: 16,

    paddingVertical: 12,

    flexDirection:
      'row',

    alignItems:
      'center',

  },


  settingInfo: {

    flex: 1,

    paddingRight: 15,

  },


  settingTitle: {

    color:
      COLORS.white,

    fontSize: 15,

    fontWeight:
      '700',

    marginBottom: 4,

  },


  settingDescription: {

    color:
      COLORS.textMuted,

    fontSize: 12,

    lineHeight: 17,

  },


  separator: {

    height: 1,

    backgroundColor:
      COLORS.border,

    marginLeft: 16,

  },


  // ====================================================
  // ABOUT
  // ====================================================

  aboutRow: {

    minHeight: 70,

    paddingHorizontal: 16,

    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'space-between',

  },


  aboutTitle: {

    color:
      COLORS.white,

    fontSize: 16,

    fontWeight:
      '800',

  },


  aboutDescription: {

    color:
      COLORS.textMuted,

    fontSize: 12,

    marginTop: 4,

  },


  version: {

    color:
      COLORS.primaryLight,

    fontSize: 13,

    fontWeight:
      '800',

  },


  // ====================================================
  // RESET
  // ====================================================

  resetButton: {

    marginTop: 24,

    height: 50,

    borderRadius: 14,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    justifyContent:
      'center',

    alignItems:
      'center',

  },


  resetText: {

    color:
      COLORS.primaryLight,

    fontSize: 14,

    fontWeight:
      '700',

  },


  // ====================================================
  // FOOTER
  // ====================================================

  footer: {

    color:
      COLORS.textMuted,

    fontSize: 10,

    textAlign:
      'center',

    marginTop: 24,

  },

});


export default SettingsScreen;