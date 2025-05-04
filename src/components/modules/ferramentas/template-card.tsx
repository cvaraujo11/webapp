import React from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, FileTextIcon, FileSpreadsheetIcon } from "@radix-ui/react-icons";

export type TemplateCardProps = {
  title: string;
  format: "docx" | "odt" | "xlsx";
  downloadUrl?: string;
};

const formatIcon = (format: string) => {
  switch (format) {
    case "docx":
      return <FileTextIcon className="w-8 h-8 text-blue-600" />;
    case "odt":
      return <FileTextIcon className="w-8 h-8 text-green-600" />;
    case "xlsx":
      return <FileSpreadsheetIcon className="w-8 h-8 text-emerald-600" />;
    default:
      return <FileTextIcon className="w-8 h-8 text-gray-400" />;
  }
};

export const TemplateCard: React.FC<TemplateCardProps> = ({ title, format, downloadUrl }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md border transition hover:shadow-lg">
      <div className="mb-2">{formatIcon(format)}</div>
      <div className="font-semibold text-lg text-center mb-1">{title}</div>
      <div className="text-xs text-gray-500 mb-4 uppercase tracking-wide">{format}</div>
      {downloadUrl ? (
        <a href={downloadUrl} download>
          <Button variant="outline" size="sm" className="gap-1">
            <DownloadIcon className="w-4 h-4" /> Baixar
          </Button>
        </a>
      ) : (
        <Button variant="outline" size="sm" disabled className="gap-1 opacity-60">
          <DownloadIcon className="w-4 h-4" /> Indisponível
        </Button>
      )}
    </div>
  );
};

export default TemplateCard;
