import React, { useState } from 'react';

interface InputBoxProps {
  sendMessage: (text: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ sendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="border-t p-4 flex items-center bg-gray-100">
      <input
        type="text"
        className="flex-grow p-3 border rounded-full mr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Tapez votre message..."
      />
      <button
        className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
        onClick={handleSend}
      >
        Envoyer
      </button>
    </div>
  );
};

export default InputBox;
