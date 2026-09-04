import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import Markdown from 'react-native-markdown-display';

import COLORS from '../theme/colors';
import chaiLogo from '../assets/chai-ai-logo.png';

// ======================================================
// CODE BLOCK
// ======================================================

const CodeBlock = ({
  node,
}) => {

  const code =
    String(
      node?.content || ''
    ).replace(
      /\n$/,
      ''
    );


  // ====================================================
  // LANGUAGE
  // ====================================================

  let language =
    'CODE';


  if (
    node?.attributes?.language
  ) {

    language =
      String(
        node.attributes.language
      ).toUpperCase();

  } else if (
    node?.sourceInfo
  ) {

    language =
      String(
        node.sourceInfo
      )
        .replace(
          /^language-/,
          ''
        )
        .toUpperCase();

  }


  // ====================================================
  // COPY CODE
  // ====================================================

  const copyCode = () => {

    Clipboard.setString(
      code
    );

  };


  return (

    <View
      style={
        styles.codeContainer
      }
    >

      {/* ============================================
          CODE HEADER
      ============================================ */}

      <View
        style={
          styles.codeHeader
        }
      >

        <Text
          style={
            styles.codeLanguage
          }
        >
          {language}
        </Text>


        <TouchableOpacity

          onPress={
            copyCode
          }

          activeOpacity={
            0.7
          }

          style={
            styles.codeCopyButton
          }

        >

          <Text
            style={
              styles.copyCodeText
            }
          >
            Copy
          </Text>

        </TouchableOpacity>

      </View>


      {/* ============================================
          CODE CONTENT
      ============================================ */}

      <ScrollView

        horizontal

        showsHorizontalScrollIndicator={
          false
        }

        style={
          styles.codeScroll
        }

        contentContainerStyle={
          styles.codeScrollContent
        }

      >

        <Text
          style={
            styles.codeText
          }
        >
          {code}
        </Text>

      </ScrollView>

    </View>

  );

};


// ======================================================
// MESSAGE BUBBLE
// ======================================================

const MessageBubble = ({
  message,
  onEditMessage,
}) => {

  const isUser =
    message.role === 'user';


  // ==================================================
  // COPY MESSAGE
  // ==================================================

  const copyMessage = () => {

    Clipboard.setString(
      String(
        message.content || ''
      )
    );

  };


  // ==================================================
  // EDIT MESSAGE
  // ==================================================

  const editMessage = () => {

    if (!isUser) {
      return;
    }


    if (
      onEditMessage
    ) {

      onEditMessage(
        message
      );

    }

  };


  // ==================================================
  // CONTENT
  // ==================================================

  const content =
    String(
      message.content || ''
    );


  return (

    <View
      style={[
        styles.container,

        isUser
          ? styles.userContainer
          : styles.aiContainer,
      ]}
    >

      {/* ============================================
          AI ICON
      ============================================ */}

      {!isUser && (

        <View
          style={
            styles.aiIcon
          }
        >

          <Image
            source={chaiLogo}
            style={styles.aiIconImage}
            resizeMode="contain"
          />

        </View>

      )}


      {/* ============================================
          BUBBLE
      ============================================ */}

      <View
        style={[
          styles.bubble,

          isUser
            ? styles.userBubble
            : styles.aiBubble,
        ]}
      >

        {/* ==========================================
            USER MESSAGE
        ========================================== */}

        {isUser ? (

          <>

            <Text
              style={
                styles.messageText
              }
            >
              {content}
            </Text>


            {/* ======================================
                EDIT BUTTON
            ====================================== */}

            <TouchableOpacity

              style={
                styles.editButton
              }

              onPress={
                editMessage
              }

              activeOpacity={
                0.7
              }

            >

              <Text
                style={
                  styles.editText
                }
              >
                Edit
              </Text>

            </TouchableOpacity>

          </>

        ) : (

          /* ========================================
             AI MESSAGE
          ======================================== */

          <Markdown

            style={
              markdownStyles
            }

            rules={{

              // ====================================
              // FENCED CODE
              // ====================================

              fence: (
                node
              ) => (

                <CodeBlock
                  node={
                    node
                  }
                />

              ),


              // ====================================
              // CODE BLOCK
              // ====================================

              code_block: (
                node
              ) => (

                <CodeBlock
                  node={
                    node
                  }
                />

              ),

            }}

          >

            {content}

          </Markdown>

        )}


        {/* ==========================================
            COPY AI MESSAGE
        ========================================== */}

        {!isUser && (

          <TouchableOpacity

            style={
              styles.copyButton
            }

            onPress={
              copyMessage
            }

            activeOpacity={
              0.7
            }

          >

            <Text
              style={
                styles.copyText
              }
            >
              Copy
            </Text>

          </TouchableOpacity>

        )}

      </View>

    </View>

  );

};


// ======================================================
// NORMAL STYLES
// ======================================================

const styles = StyleSheet.create({

  // ====================================================
  // CONTAINER
  // ====================================================

  container: {

    width:
      '100%',

    marginBottom:
      18,

    paddingHorizontal:
      10,

    flexDirection:
      'row',

  },


  userContainer: {

    justifyContent:
      'flex-end',

  },


  aiContainer: {

    justifyContent:
      'flex-start',

  },


  // ====================================================
  // AI ICON
  // ====================================================

  aiIcon: {

    width:
      30,

    height:
      30,

    borderRadius:
      15,

    backgroundColor:
      '#F4E7D0',

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      5,

    marginTop:
      2,

    overflow:
      'hidden',

    borderWidth:
      1,

    borderColor:
      COLORS.primary,

  },

  aiIconImage: {

    width:
      '115%',

    height:
      '115%',

  },

  // ====================================================
  // BUBBLE
  // ====================================================

  bubble: {

    maxWidth:
      '90%',

    paddingHorizontal:
      15,

    paddingVertical:
      12,

    borderRadius:
      18,

  },


  userBubble: {

    backgroundColor:
      COLORS.userBubble,

    borderBottomRightRadius:
      5,

  },


  aiBubble: {

    backgroundColor:
      COLORS.aiBubble,

    borderWidth:
      1,

    borderColor:
      COLORS.border,

    borderBottomLeftRadius:
      5,

  },


  // ====================================================
  // MESSAGE TEXT
  // ====================================================

  messageText: {

    color:
      COLORS.text,

    fontSize:
      15.5,

    lineHeight:
      23,

  },


  // ====================================================
  // EDIT
  // ====================================================

  editButton: {

    marginTop:
      10,

    alignSelf:
      'flex-end',

  },


  editText: {

    color:
      COLORS.primaryLight,

    fontSize:
      12,

    fontWeight:
      '600',

  },


  // ====================================================
  // COPY
  // ====================================================

  copyButton: {

    marginTop:
      10,

    alignSelf:
      'flex-start',

  },


  copyText: {

    color:
      COLORS.primaryLight,

    fontSize:
      12,

    fontWeight:
      '600',

  },


  // ====================================================
  // CODE BLOCK
  // ====================================================

  codeContainer: {

    marginTop:
      8,

    marginBottom:
      10,

    backgroundColor:
      '#120D0A',

    borderWidth:
      1,

    borderColor:
      '#493125',

    borderRadius:
      10,

    overflow:
      'hidden',

  },
  codeHeader: {

    height:
      36,

    paddingHorizontal:
      12,

    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'space-between',

    backgroundColor:
      '#1E1510',

    borderBottomWidth:
      1,

    borderBottomColor:
      '#493125',

  },
codeLanguage: {

  color:
    '#C8B8A5',

  fontSize:
    11,

  fontWeight:
    '700',

  letterSpacing:
    0.8,

},

  codeCopyButton: {

    paddingHorizontal:
      4,

    paddingVertical:
      4,

  },


  copyCodeText: {

  codeText: {

  color:
    '#F1E4D0',

  fontSize:
    13,

  lineHeight:
    19,

  fontFamily:
    'monospace',

},
  color:
      COLORS.primaryLight,

    fontSize:
      11,

    fontWeight:
      '700',

  },


  // ====================================================
  // CODE SCROLL
  // ====================================================

  codeScroll: {

    width:
      '100%',

  },


  codeScrollContent: {

    paddingHorizontal:
      12,

    paddingVertical:
      12,

  },


  // ====================================================
  // CODE TEXT
  // ====================================================

  codeText: {

    color:
      '#D7E2F0',

    fontSize:
      13,

    lineHeight:
      19,

    fontFamily:
      'monospace',

  },

});


// ======================================================
// MARKDOWN STYLES
// ======================================================

const markdownStyles = {

  body: {

    color:
      COLORS.text,

    fontSize:
      15.5,

    lineHeight:
      23,

  },


  paragraph: {

    color:
      COLORS.text,

    fontSize:
      15.5,

    lineHeight:
      23,

    marginTop:
      0,

    marginBottom:
      10,

  },


  // ====================================================
  // HEADINGS
  // ====================================================

  heading1: {

    color:
      COLORS.white,

    fontSize:
      22,

    fontWeight:
      '800',

    lineHeight:
      28,

    marginTop:
      4,

    marginBottom:
      10,

  },


  heading2: {

    color:
      COLORS.white,

    fontSize:
      19,

    fontWeight:
      '800',

    lineHeight:
      25,

    marginTop:
      4,

    marginBottom:
      8,

  },


  heading3: {

    color:
      COLORS.white,

    fontSize:
      17,

    fontWeight:
      '700',

    lineHeight:
      23,

    marginTop:
      3,

    marginBottom:
      7,

  },


  heading4: {

    color:
      COLORS.white,

    fontSize:
      16,

    fontWeight:
      '700',

    lineHeight:
      22,

    marginTop:
      3,

    marginBottom:
      6,

  },


  heading5: {

    color:
      COLORS.white,

    fontSize:
      15.5,

    fontWeight:
      '700',

    lineHeight:
      21,

    marginTop:
      3,

    marginBottom:
      5,

  },


  heading6: {

    color:
      COLORS.textSecondary ||
      '#AAB5C4',

    fontSize:
      15,

    fontWeight:
      '700',

    lineHeight:
      21,

    marginTop:
      3,

    marginBottom:
      5,

  },


  // ====================================================
  // BOLD
  // ====================================================

  strong: {

    color:
      COLORS.white,

    fontWeight:
      '800',

  },


  // ====================================================
  // ITALIC
  // ====================================================

  em: {

    color:
      COLORS.text,

    fontStyle:
      'italic',

  },


  // ====================================================
  // INLINE CODE
  // ====================================================

  code_inline: {

     color:
    '#E2BE73',

  backgroundColor:
    '#18100C',

    borderRadius:
      5,

    paddingHorizontal:
      5,

    paddingVertical:
      2,

    fontSize:
      13,

    fontFamily:
      'monospace',

  },


  // ====================================================
  // FALLBACK CODE BLOCK
  // ====================================================

  code_block: {

   color:
    '#F1E4D0',

  backgroundColor:
    '#120D0A',

  borderWidth:
    1,

  borderColor:
    '#493125',

    borderRadius:
      10,

    padding:
      12,

    fontSize:
      13,

    lineHeight:
      19,

    fontFamily:
      'monospace',

    marginTop:
      6,

    marginBottom:
      10,

  },


  // ====================================================
  // FENCE
  // ====================================================

  fence: {

   color:
    '#F1E4D0',

  backgroundColor:
    '#120D0A',

  borderWidth:
    1,

  borderColor:
    '#493125',

    borderRadius:
      10,

    padding:
      12,

    fontSize:
      13,

    lineHeight:
      19,

    fontFamily:
      'monospace',

    marginTop:
      6,

    marginBottom:
      10,

  },


  // ====================================================
  // LISTS
  // ====================================================

  bullet_list: {

    marginBottom:
      8,

  },


  ordered_list: {

    marginBottom:
      8,

  },


  bullet_list_icon: {

    color:
      COLORS.primaryLight,

    fontSize:
      14,

    marginRight:
      6,

  },


  ordered_list_icon: {

    color:
      COLORS.primaryLight,

    fontSize:
      14,

    marginRight:
      6,

  },


  list_item: {

    marginBottom:
      4,

  },


  // ====================================================
  // BLOCKQUOTE
  // ====================================================

  blockquote: {

    backgroundColor:
      '#2A1D16',

    borderLeftWidth:
      3,

    borderLeftColor:
      COLORS.primary,

    paddingHorizontal:
      12,

    paddingVertical:
      7,

    marginVertical:
      6,

  },


  // ====================================================
  // LINKS
  // ====================================================

  link: {

    color:
      '#E2BE73',

    textDecorationLine:
      'underline',

  },


  // ====================================================
  // HORIZONTAL RULE
  // ====================================================

  hr: {

    backgroundColor:
      '#493125',

    height:
      1,

    marginVertical:
      10,

  },


  // ====================================================
  // TABLE
  // ====================================================

  table: {

    borderWidth:
      1,

    borderColor:
      '#493125',

    borderRadius:
      8,

    marginVertical:
      8,

  },


  thead: {

    backgroundColor:
      '#1E1510',

  },


  th: {

    color:
      COLORS.white,

    fontWeight:
      '700',

    padding:
      7,

    borderWidth:
      1,

    borderColor:
      '#493125',

  },


  td: {

    color:
      COLORS.text,

    padding:
      7,

    borderWidth:
      1,

    borderColor:
      '#493125',

  },

};


export default MessageBubble;