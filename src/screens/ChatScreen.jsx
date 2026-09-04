import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import Header from '../components/Header';
import ChatInput from '../components/ChatInput';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import EmptyState from '../components/EmptyState';
import Sidebar from '../components/Sidebar';
import SettingsScreen from './SettingsScreen';
import HelpFeedbackScreen from './HelpFeedbackScreen';

import COLORS from '../theme/colors';

import getAIResponse from '../services/aiService';

import {
  getChats,
  getActiveChatId,
  setActiveChatId,
  createChat,
  getChat,
  saveMessages,
  deleteChat,
  renameChat,
  pinChat,
} from '../storage/chatStorage';


const ChatScreen = ({ onOpenSettings }) => {
  // ==================================================
  // STATE
  // ==================================================

  const [messages, setMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [chats, setChats] = useState([]);

  const [activeChatId, setActiveChatIdState] = useState(null);

  const [helpVisible, setHelpVisible] = useState(false);

  // ==================================================
  // V9 EDIT STATE
  // ==================================================

  const [editingMessage, setEditingMessage] = useState(null);


  // ==================================================
  // V13 SETTINGS STATE
  // ==================================================

  const [settingsVisible, setSettingsVisible] = useState(false);


  // ==================================================
  // LIST REF
  // ==================================================

  const listRef = useRef(null);


  // ==================================================
  // INITIALIZE
  // ==================================================

  useEffect(() => {

    initializeChat();

  }, []);

  //help
  const openHelp = () => {
    setSidebarVisible(false);
    setHelpVisible(true);
  };

  const closeHelp = () => {
    setHelpVisible(false);
  };
  // ==================================================
  // INITIALIZE CHAT
  // ==================================================

  const initializeChat = async () => {

    try {

      let chatId = await getActiveChatId();

      let chat = null;


      if (chatId) {

        chat = await getChat(chatId);

      }


      // Create first chat if none exists

      if (!chat) {

        chat = await createChat();

        chatId = chat.id;

      }


      await setActiveChatId(chatId);

      setActiveChatIdState(chatId);

      setMessages(chat.messages || []);

      await refreshChats();

    } catch (error) {

      console.log(
        'Initialize chat error:',
        error
      );

    }

  };


  // ==================================================
  // REFRESH SIDEBAR
  // ==================================================

  const refreshChats = async () => {

    try {

      const allChats = await getChats();

      setChats(allChats);

    } catch (error) {

      console.log(
        'Refresh chats error:',
        error
      );

    }

  };


  // ==================================================
  // SELECT CHAT
  // ==================================================

  const selectChat = async chatId => {

    try {

      const chat = await getChat(chatId);


      if (!chat) {

        return;

      }


      await setActiveChatId(chatId);

      setActiveChatIdState(chatId);

      setMessages(chat.messages || []);

      setEditingMessage(null);

      setIsTyping(false);

      setSidebarVisible(false);

    } catch (error) {

      console.log(
        'Select chat error:',
        error
      );

    }

  };


  // ==================================================
  // NEW CHAT
  // ==================================================

  const newChat = async () => {

    try {

      setIsTyping(false);

      setEditingMessage(null);


      const chat = await createChat();


      await setActiveChatId(chat.id);

      setActiveChatIdState(chat.id);

      setMessages([]);


      await refreshChats();

      setSidebarVisible(false);

    } catch (error) {

      console.log(
        'New chat error:',
        error
      );

    }

  };


  // ==================================================
  // DELETE CHAT
  // ==================================================

  const handleDeleteChat = async chatId => {

    try {

      await deleteChat(chatId);


      const remainingChats =
        await getChats();


      if (chatId === activeChatId) {

        if (remainingChats.length > 0) {

          const nextChat =
            remainingChats[0];


          await setActiveChatId(
            nextChat.id
          );


          setActiveChatIdState(
            nextChat.id
          );


          setMessages(
            nextChat.messages || []
          );

        } else {

          const newConversation =
            await createChat();


          await setActiveChatId(
            newConversation.id
          );


          setActiveChatIdState(
            newConversation.id
          );


          setMessages([]);

        }

      }


      setEditingMessage(null);

      await refreshChats();

    } catch (error) {

      console.log(
        'Delete chat error:',
        error
      );

    }

  };


  // ==================================================
  // RENAME CHAT
  // ==================================================

  const handleRenameChat =
    async (
      chatId,
      newTitle
    ) => {

      try {

        if (
          !newTitle ||
          !newTitle.trim()
        ) {

          return;

        }


        await renameChat(
          chatId,
          newTitle.trim()
        );


        await refreshChats();

      } catch (error) {

        console.log(
          'Rename chat error:',
          error
        );

      }

    };


  // ==================================================
  // PIN CHAT
  // ==================================================

  const handlePinChat =
    async chatId => {

      try {

        if (pinChat) {

          await pinChat(chatId);

        }


        await refreshChats();

      } catch (error) {

        console.log(
          'Pin chat error:',
          error
        );

      }

    };


  // ==================================================
  // V9 - START EDITING
  // ==================================================

  const handleEditMessage =
    message => {

      if (!message) {

        return;

      }


      if (message.role !== 'user') {

        return;

      }


      setEditingMessage(message);


      setTimeout(() => {

        listRef.current?.scrollToEnd({
          animated: true,
        });

      }, 100);

    };


  // ==================================================
  // V9 - CANCEL EDIT
  // ==================================================

  const cancelEdit = () => {

    setEditingMessage(null);

  };


  // ==================================================
  // V9 - REGENERATE EDITED MESSAGE
  // ==================================================

  const regenerateEditedMessage =
    async newText => {

      if (!editingMessage) {

        return;

      }


      const cleanText =
        newText.trim();


      if (!cleanText) {

        return;

      }


      setIsTyping(true);


      try {

        const editedIndex =
          messages.findIndex(
            item =>
              item.id ===
              editingMessage.id
          );


        if (editedIndex === -1) {

          setEditingMessage(null);

          setIsTyping(false);

          return;

        }


        // Keep everything before edited message

        const previousMessages =
          messages.slice(
            0,
            editedIndex
          );


        // New user message

        const updatedUserMessage = {

          id:
            `${Date.now()}-user`,

          role:
            'user',

          content:
            cleanText,

        };


        const messagesForAI = [

          ...previousMessages,

          updatedUserMessage,

        ];


        setMessages(messagesForAI);


        await saveMessages(
          messagesForAI
        );


        await refreshChats();


        // Get new AI answer

        const answer =
          await getAIResponse(
            cleanText,
            messagesForAI
          );


        const aiMessage = {

          id:
            `${Date.now()}-ai`,

          role:
            'assistant',

          content:
            answer,

        };


        const finalMessages = [

          ...messagesForAI,

          aiMessage,

        ];


        setMessages(finalMessages);


        await saveMessages(
          finalMessages
        );


        await refreshChats();


        setEditingMessage(null);

      } catch (error) {

        console.log(
          'Edit message error:',
          error
        );


        const errorMessage = {

          id:
            `${Date.now()}-error`,

          role:
            'assistant',

          content:
            error?.message ||
            'Something went wrong. Please try again.',

        };


        setMessages(
          currentMessages => {

            const finalMessages = [

              ...currentMessages,

              errorMessage,

            ];


            saveMessages(
              finalMessages
            );


            return finalMessages;

          }
        );


        setEditingMessage(null);

      } finally {

        setIsTyping(false);

      }

    };


  // ==================================================
  // SEND MESSAGE
  // ==================================================

  const sendMessage =
    async text => {

      if (
        !text ||
        !text.trim()
      ) {

        return;

      }


      const cleanText =
        text.trim();


      // ==================================================
      // V9 EDIT MODE
      // ==================================================

      if (editingMessage) {

        await regenerateEditedMessage(
          cleanText
        );

        return;

      }


      // ==================================================
      // NORMAL MESSAGE
      // ==================================================

      const userMessage = {

        id:
          `${Date.now()}-user`,

        role:
          'user',

        content:
          cleanText,

      };


      const updatedMessages = [

        ...messages,

        userMessage,

      ];


      setMessages(
        updatedMessages
      );


      await saveMessages(
        updatedMessages
      );


      await refreshChats();


      setIsTyping(true);


      try {

        const answer =
          await getAIResponse(
            cleanText,
            updatedMessages
          );


        const aiMessage = {

          id:
            `${Date.now()}-ai`,

          role:
            'assistant',

          content:
            answer,

        };


        const finalMessages = [

          ...updatedMessages,

          aiMessage,

        ];


        setMessages(
          finalMessages
        );


        await saveMessages(
          finalMessages
        );


        await refreshChats();

      } catch (error) {

        console.log(
          'AI error:',
          error
        );


        const errorMessage = {

          id:
            `${Date.now()}-error`,

          role:
            'assistant',

          content:
            error?.message ||
            'Something went wrong. Please try again.',

        };


        const finalMessages = [

          ...updatedMessages,

          errorMessage,

        ];


        setMessages(
          finalMessages
        );


        await saveMessages(
          finalMessages
        );


        await refreshChats();

      } finally {

        setIsTyping(false);

      }

    };


  // ==================================================
  // V13 - SETTINGS
  // ==================================================

  const openSettings = () => {

    setSidebarVisible(false);

    setSettingsVisible(true);

  };


  const closeSettings = () => {

    setSettingsVisible(false);

  };


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <KeyboardAvoidingView

      style={
        styles.container
      }

      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }

    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <Header

        onNewChat={
          newChat
        }

        onMenu={() =>
          setSidebarVisible(true)
        }

        onOpenSettings={openSettings}

      />


      {/* ==========================================
          CHAT AREA
      ========================================== */}

      <View
        style={
          styles.chatArea
        }
      >

        {messages.length === 0 ? (

          <EmptyState />

        ) : (

          <FlatList

            ref={
              listRef
            }

            data={
              messages
            }

            keyExtractor={
              item =>
                String(item.id)
            }

            renderItem={({
              item,
            }) => (

              <MessageBubble

                message={
                  item
                }

                onEditMessage={
                  handleEditMessage
                }

              />

            )}

            contentContainerStyle={
              styles.messagesContent
            }

            showsVerticalScrollIndicator={
              false
            }

            keyboardDismissMode={
              'on-drag'
            }

            onContentSizeChange={() => {

              listRef.current?.scrollToEnd({
                animated: true,
              });

            }}

          />

        )}


        {isTyping && (

          <TypingIndicator />

        )}

      </View>


      {/* ==========================================
          CHAT INPUT
      ========================================== */}

      <ChatInput

        onSend={
          sendMessage
        }

        editingText={
          editingMessage?.content || ''
        }

        isEditing={
          !!editingMessage
        }

        onCancelEdit={
          cancelEdit
        }

      />


      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <Sidebar

        visible={
          sidebarVisible
        }

        chats={
          chats
        }

        activeChatId={
          activeChatId
        }

        onClose={() =>
          setSidebarVisible(false)
        }

        onNewChat={
          newChat
        }

        onSelectChat={
          selectChat
        }

        onDeleteChat={
          handleDeleteChat
        }

        onRenameChat={
          handleRenameChat
        }

        onPinChat={
          handlePinChat
        }

        onSettings={
          openSettings
        }
        onHelp={openHelp}
      />
<HelpFeedbackScreen
    visible={helpVisible}
    onClose={closeHelp}
/>

      {/* ==========================================
          V13 SETTINGS
      ========================================== */}

      {/* 
        If you already created SettingsScreen,
        import it and uncomment this section.

        import SettingsScreen from './SettingsScreen';

        Then:

        */}
      <SettingsScreen
        visible={settingsVisible}
        onClose={closeSettings}
      />

    </KeyboardAvoidingView>

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

    paddingTop:
      20,

  },


  chatArea: {

    flex: 1,

  },


  messagesContent: {

    paddingTop:
      18,

    paddingBottom:
      10,

  },

});


export default ChatScreen;