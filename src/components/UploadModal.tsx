import React, { useState } from 'react';
import Modal from 'react-modal';

interface UploadModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onFileUpload: (file: File) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onRequestClose, onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Upload PDF"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-2xl mb-4">Upload PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div className="mt-4">
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300 mr-2"
          onClick={handleUpload}
        >
          Upload
        </button>
        <button
          className="bg-gray-600 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition duration-300"
          onClick={onRequestClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default UploadModal;
