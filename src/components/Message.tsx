import React from 'react';

interface MessageProps {
  sender: 'user' | 'bot';
  text: string;
}

const Message: React.FC<MessageProps> = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`p-4 rounded-xl max-w-md ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} shadow-md`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
