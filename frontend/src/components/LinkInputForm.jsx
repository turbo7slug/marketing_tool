import React, { useState } from 'react';
import { FaGoogleDrive } from 'react-icons/fa';

const LinkInputForm = ({ onSubmitLink }) => {
  const [inputLink, setInputLink] = useState('');

  const handleChange = (e) => setInputLink(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputLink) {
      onSubmitLink(inputLink);
      setInputLink('');
    } else {
      alert('Please enter a valid Google Sheets link.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaGoogleDrive className="text-green-600 mr-2" /> Enter Google Sheets Link
      </h2>
      <input
        type="text"
        value={inputLink}
        onChange={handleChange}
        placeholder="Enter Google Sheets link"
        className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button 
        type="submit" 
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded shadow-md transition duration-300 ease-in-out"
      >
        Submit Link
      </button>
    </form>
  );
};

export default LinkInputForm;
