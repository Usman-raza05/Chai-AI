import React, { useState } from 'react';

import ChatScreen from './src/screens/ChatScreen';
import SettingsScreen from './src/screens/SettingsScreen';


const App = () => {

  const [screen, setScreen] =
    useState('chat');


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