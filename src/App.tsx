import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import UploadModal from './components/UploadModal';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendMessage = async (text: string) => {
    setMessages([...messages, { sender: 'user', text }]);

    try {
      const response = await fetch('http://localhost:4001/api/agent/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: text }),
      });

      const data = await response.json();
      const botMessage = data.result;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botMessage },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: "Une erreur est survenue. Veuillez réessayer." },
      ]);
    }
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4001/api/db/fromPDF', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const botMessage = data.result;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botMessage },
      ]);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: "Une erreur est survenue lors du téléchargement du fichier." },
      ]);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col w-full max-w-3xl h-5/6 bg-white shadow-2xl rounded-lg overflow-hidden">
        <ChatWindow messages={messages} />
        <InputBox sendMessage={sendMessage} />
        <button
          className="bg-blue-600 text-white p-3 m-4 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          Upload PDF
        </button>
      </div>
      <UploadModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
}

export default App;
