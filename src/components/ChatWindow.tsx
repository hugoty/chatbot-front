import React, { useEffect, useRef } from 'react';
import Message from './Message';

interface ChatWindowProps {
  messages: {
    sender: 'user' | 'bot';
    text: string;
  }[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-grow p-6 overflow-y-auto">
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
