import React, { useState, useEffect } from 'react';

import ChatScreen from './src/screens/ChatScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import registerUser from './src/services/userService';

const App = () => {

  const [screen, setScreen] =
    useState('chat');

 useEffect(() => {
    const initializeUser = async () => {
        console.log('🚀 Initializing Chai AI user...');

        try {
            const user = await registerUser();

            console.log(
                '✅ Chai AI user initialized successfully:',
                user
            );
        } catch (error) {
            console.error(
                '❌ Failed to initialize Chai AI user:',
                error
            );
        }
    };

    initializeUser();
}, []);
  // ==============================================
  // SETTINGS SCREEN
  // ==============================================

  if (screen === 'settings') {

    return (
      <SettingsScreen
        onBack={() => setScreen('chat')}
      />
    );

  }


  // ==============================================
  // CHAT SCREEN
  // ==============================================

  return (
    <ChatScreen
      onOpenSettings={() =>
        setScreen('settings')
      }
    />
  );

};


export default App;