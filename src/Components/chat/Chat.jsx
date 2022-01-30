import React from 'react';
import TextInput from './TextInput.jsx';
import TextDisplay from './TextDisplay.jsx';

const Chat = (props) => {

  return (
    <div id="input-container">
      <TextDisplay />
      <TextInput />
    </div>
  );
};

export default Chat;