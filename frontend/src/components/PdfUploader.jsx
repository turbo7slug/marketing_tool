import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

const PdfUploader = ({ onPdfUpload }) => (
  <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4 flex items-center">
      <FaFilePdf className="text-red-600 mr-2" /> Upload PDF Document
    </h2>
    <input
      type="file"
      accept="application/pdf"
      onChange={onPdfUpload}
      className="border border-gray-300 p-3 rounded w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
);

export default PdfUploader;
