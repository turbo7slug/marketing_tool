import React, { useState } from 'react';
import Header from './components/Header';
import PdfUploader from './components/PdfUploader';
import Footer from './components/Footer';
import { RingLoader } from 'react-spinners';
import { AiOutlineDownload } from 'react-icons/ai';
import { AiFillFileExcel } from 'react-icons/ai'; // Excel Icon

const App = () => {
  const [pdf, setPdf] = useState(null);
  const [excel, setExcel] = useState(null);
  const [append, setAppend] = useState(false);
  const [loadingState, setLoadingState] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handlePdfUpload = (e) => {
    setPdf(e.target.files[0]);
    setErrorMessage('');
  };

  const handleExcelUpload = (e) => {
    setExcel(e.target.files[0]);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (!pdf) {
      setErrorMessage('Please upload a PDF.');
      return;
    }

    if (append && !excel) {
      setErrorMessage('Please upload an Excel file to append.');
      return;
    }

    setIsSubmitting(true);
    setLoadingState('Processing PDF and extracting product details...');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('append', append);

    if (append) {
      formData.append('excel', excel);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error processing the PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      setDownloadUrl(url);

      setLoadingState('PDF processed successfully. Click to download the Excel file.');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to process the PDF. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <h1 className='text-4xl font-semibold mb-4 mt-5 mx-auto'>Extract and Download Product Details from PDF</h1>
      <main className="flex-grow container my-10 mx-auto p-6">
        <div className="flex flex-wrap md:flex-nowrap md:space-x-6 justify-center items-start">
          <div className="flex flex-col items-center justify-center bg-white p-6 shadow-md rounded-lg w-full md:w-1/2 h-[300px]">
            <PdfUploader onPdfUpload={handlePdfUpload} />
          </div>
          <div className="flex flex-col items-center justify-center bg-white p-6 shadow-md rounded-lg w-full md:w-1/2 h-[300px] mt-6 md:mt-0">
            <h2 className="text-2xl font-semibold mb-4">Append to Existing Excel?</h2>
            <div className="flex items-center">
              <input
                type="radio"
                id="new"
                name="appendOption"
                checked={!append}
                onChange={() => setAppend(false)}
                className="mr-2"
              />
              <label htmlFor="new" className="mr-6">Create New Excel</label>
              <input
                type="radio"
                id="append"
                name="appendOption"
                checked={append}
                onChange={() => setAppend(true)}
                className="mr-2"
              />
              <label htmlFor="append" className="mr-6">Append to Excel</label>
            </div>
            {append && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <AiFillFileExcel className="text-green-600 mr-2" /> Upload Excel File
                </h2>
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={handleExcelUpload}
                  className="border border-gray-300 p-3 rounded w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            )}
          </div>
        </div>
        {errorMessage && (
          <div className="text-red-500 mt-4 text-center">
            {errorMessage}
          </div>
        )}
        <div className="flex flex-col items-center mt-10">
          <button 
            onClick={handleSubmit} 
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow-md transition duration-300 ease-in-out ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isSubmitting}
          >
            Submit
          </button>
          {isSubmitting && (
            <div className="flex flex-col items-center mt-4">
              <RingLoader color="#007bff" size={50} />
              <p className="mt-2 text-gray-700">{loadingState}</p>
            </div>
          )}
          {downloadUrl && (
            <div className="flex flex-col items-center mt-4">
              <a
                href={downloadUrl}
                download="products_details.xlsx"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded shadow-md flex items-center space-x-2 transition duration-300 ease-in-out"
              >
                <AiOutlineDownload className="mr-2" />
                <span>Download Excel</span>
              </a>
              <p className="mt-2 text-gray-700">{loadingState}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
