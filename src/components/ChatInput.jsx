import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';

import COLORS from '../theme/colors';


const ChatInput = ({
  onSend,
  editingText = '',
  isEditing = false,
  onCancelEdit,
}) => {

  const [text, setText] =
    useState('');


  // ==================================================
  // LOAD EDITING MESSAGE
  // ==================================================

  useEffect(() => {

    if (isEditing) {

      setText(
        editingText || ''
      );

    }

  }, [
    isEditing,
    editingText,
  ]);


  // ==================================================
  // SEND MESSAGE
  // ==================================================

  const handleSend = () => {

    const message =
      text.trim();


    if (!message) {
      return;
    }


    onSend(
      message
    );


    setText('');


    Keyboard.dismiss();

  };


  // ==================================================
  // CANCEL EDIT
  // ==================================================

  const handleCancelEdit = () => {

    setText('');


    Keyboard.dismiss();


    if (onCancelEdit) {

      onCancelEdit();

    }

  };


  return (

    <View
      style={styles.wrapper}
    >

      {/* ============================================
          EDITING BAR
      ============================================ */}

      {isEditing && (

        <View
          style={styles.editingBar}
        >

          <View
            style={styles.editingInfo}
          >

            <Text
              style={styles.editingTitle}
            >
              Editing message
            </Text>


            <Text
              style={styles.editingSubtitle}
              numberOfLines={1}
            >
              Change your message and send again
            </Text>

          </View>


          <TouchableOpacity
            onPress={handleCancelEdit}
            activeOpacity={0.7}
            style={styles.cancelButton}
          >

            <Text
              style={styles.cancelText}
            >
              ✕
            </Text>

          </TouchableOpacity>

        </View>

      )}


      {/* ============================================
          INPUT CONTAINER
      ============================================ */}

      <View
        style={[
          styles.inputContainer,

          isEditing &&
            styles.inputContainerEditing,
        ]}
      >

        <TextInput

          value={
            text
          }

          onChangeText={
            setText
          }

          placeholder={
            isEditing
              ? 'Edit message...'
              : 'Message Chai AI...'
          }

          placeholderTextColor={
            COLORS.textMuted
          }

          multiline

          maxLength={
            4000
          }

          style={
            styles.input
          }

          textAlignVertical={
            'center'
          }

          returnKeyType={
            'default'
          }

        />


        {/* ==========================================
            SEND BUTTON
        ========================================== */}

        <TouchableOpacity

          onPress={
            handleSend
          }

          activeOpacity={
            0.8
          }

          style={[
            styles.sendButton,

            !text.trim() &&
              styles.sendButtonDisabled,
          ]}

          disabled={
            !text.trim()
          }

        >

          <Text
            style={
              styles.sendIcon
            }
          >
            ↑
          </Text>

        </TouchableOpacity>

      </View>


      {/* ============================================
          DISCLAIMER
      ============================================ */}

      <Text
        style={
          styles.disclaimer
        }
      >
        Chai AI can make mistakes. Check important information.
      </Text>

    </View>

  );
};


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  wrapper: {

    paddingHorizontal: 14,

    paddingTop: 8,

    paddingBottom: 10,

    backgroundColor:
      COLORS.bg,

  },


  // ====================================================
  // EDITING BAR
  // ====================================================

  editingBar: {

    minHeight: 48,

    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'space-between',

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderBottomWidth:
      0,

    borderTopLeftRadius:
      14,

    borderTopRightRadius:
      14,

    paddingHorizontal:
      12,

    paddingVertical:
      7,

  },


  editingInfo: {

    flex: 1,

    paddingRight:
      10,

  },


  editingTitle: {

    color:
      COLORS.primaryLight,

    fontSize:
      12,

    fontWeight:
      '700',

  },


  editingSubtitle: {

    color:
      COLORS.textMuted,

    fontSize:
      10,

    marginTop:
      2,

  },


  cancelButton: {

    width:
      30,

    height:
      30,

    borderRadius:
      15,

    justifyContent:
      'center',

    alignItems:
      'center',

  },


  cancelText: {

    color:
      COLORS.textMuted,

    fontSize:
      17,

    fontWeight:
      '600',

  },


  // ====================================================
  // INPUT
  // ====================================================

  inputContainer: {
  minHeight: 54,
  maxHeight: 130,

  flexDirection: 'row',
  alignItems: 'flex-end',

  backgroundColor: COLORS.surface,

  borderWidth: 1,
  borderColor: COLORS.border,

  borderRadius: 18,

  paddingLeft: 16,
  paddingRight: 7,
  paddingVertical: 7,
},


  inputContainerEditing: {

    borderTopLeftRadius:
      0,

    borderTopRightRadius:
      0,

  },


  input: {

    flex: 1,

    color:
      COLORS.white,

    fontSize:
      15,

    maxHeight:
      110,

    paddingTop:
      9,

    paddingBottom:
      9,

    paddingRight:
      10,

  },


  // ====================================================
  // SEND BUTTON
  // ====================================================

  sendButton: {
  width: 40,
  height: 40,

  borderRadius: 13,

  backgroundColor: COLORS.primary,

  justifyContent: 'center',
  alignItems: 'center',

  shadowColor: COLORS.primary,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.25,
  shadowRadius: 5,

  elevation: 4,
},


  sendButtonDisabled: {

    opacity:
      0.35,

  },


  sendIcon: {
  color: '#FFF8ED',
  fontSize: 23,
  fontWeight: '700',
  marginTop: -3,
},


  // ====================================================
  // DISCLAIMER
  // ====================================================

  disclaimer: {

    textAlign:
      'center',

    color:
      COLORS.textMuted,

    fontSize:
      10,

    marginTop:
      7,

  },

});


export default ChatInput;