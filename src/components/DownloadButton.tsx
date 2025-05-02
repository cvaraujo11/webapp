import React from 'react';

interface DownloadButtonProps {
  fileName: string;
  label: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileName, label }) => {
  // O link aponta para a pasta public/templates
  const filePath = `/templates/${fileName}`;

  return (
    <a
      href={filePath}
      download
      className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
    >
      {/* Ícone de download (exemplo SVG) */}
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l3-3m-3 3l-3-3m2-8h7a2 2 0 012 2v7a2 2 0 01-2 2h-7"></path>
      </svg>
      {label}
    </a>
  );
};

export default DownloadButton;