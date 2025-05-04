'use client';

import React from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';
import DownloadButton from './DownloadButton';

interface TemplateCardProps {
  title: string;
  format: 'docx' | 'odt' | 'xlsx';
  description: string;
  filename: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  format,
  description,
  filename,
}) => {
  const getFormatIcon = () => {
    switch (format) {
      case 'xlsx':
        return <FileSpreadsheet className="w-8 h-8 text-emerald-600" aria-hidden="true" />;
      default:
        return <FileText className="w-8 h-8 text-blue-600" aria-hidden="true" />;
    }
  };

  const getFormatLabel = () => {
    switch (format) {
      case 'docx':
        return 'Documento Word';
      case 'odt':
        return 'Documento OpenDocument';
      case 'xlsx':
        return 'Planilha Excel';
    }
  };

  return (
    <div
      className="relative group rounded-lg border p-4 hover:shadow-md transition-all duration-300 bg-white"
      role="article"
      aria-labelledby={`template-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 rounded-md bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
          {getFormatIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3
            id={`template-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-lg font-semibold text-gray-900 mb-1"
          >
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">
            {description}
          </p>
          
          <div className="flex items-center gap-2">
            <span 
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
              aria-label={`Formato: ${getFormatLabel()}`}
            >
              {format.toUpperCase()}
            </span>
            
            <DownloadButton
              fileName={filename}
              label="Baixar Template"
              variant="outline"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;