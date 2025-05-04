import React, { useState } from 'react';
import { File, Eye, FileText, X, Download } from 'lucide-react';
import DownloadButton from './DownloadButton';

interface TemplateCardProps {
  title: string;
  description: string;
  fileName: string;
  fileType: 'docx' | 'odt' | 'xlsx' | 'pdf';
  category?: string;
  previewImageUrl?: string;
}

const FileIcon = ({ fileType }: { fileType: string }) => {
  switch (fileType) {
    case 'docx':
      return <FileText className="w-8 h-8 text-blue-500" />;
    case 'odt':
      return <FileText className="w-8 h-8 text-purple-500" />;
    case 'xlsx':
      return <FileText className="w-8 h-8 text-green-500" />;
    case 'pdf':
      return <FileText className="w-8 h-8 text-red-500" />;
    default:
      return <File className="w-8 h-8 text-gray-500" />;
  }
};

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  description,
  fileName,
  fileType,
  category,
  previewImageUrl,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  // Placeholder image if no preview is available
  const placeholderImage = `/placeholders/${fileType}-placeholder.png`;
  const imageToShow = previewImageUrl || placeholderImage;

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between p-3 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="flex items-center">
          <FileIcon fileType={fileType} />
          <h3 className="text-lg font-medium ml-2 text-[var(--color-foreground)]">{title}</h3>
        </div>
        {category && (
          <span className="text-xs px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
            {category}
          </span>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-sm text-[var(--color-text-light)] mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-md hover:bg-[var(--color-secondary)]/20 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Visualizar
          </button>
          
          <DownloadButton fileName={fileName} label={`Baixar ${fileType.toUpperCase()}`} />
        </div>
      </div>
      
      {/* Modal de Visualização */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fadeIn">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
              <h3 className="font-medium">{title} - Visualização</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-[var(--color-text-light)] hover:text-[var(--color-foreground)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <div className="relative border border-[var(--color-border)] rounded shadow-inner bg-gray-50 flex items-center justify-center min-h-[300px]">
                <img 
                  src={imageToShow} 
                  alt={`Visualização de ${title}`} 
                  className="max-w-full h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholders/generic-placeholder.png';
                  }}
                />
              </div>
              
              <p className="mt-4 text-sm text-[var(--color-text-light)]">
                Esta é uma visualização do template. Para editar, clique em baixar abaixo.
              </p>
            </div>
            
            <div className="p-4 border-t border-[var(--color-border)] flex justify-end">
              <DownloadButton fileName={fileName} label={`Baixar ${fileType.toUpperCase()}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCard; 