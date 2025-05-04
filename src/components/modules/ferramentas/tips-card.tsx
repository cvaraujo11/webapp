import React from "react";
import { Lightbulb } from "lucide-react";

interface TipsCardProps {
  tips: { title: string; description: string }[];
}

const TipsCard: React.FC<TipsCardProps> = ({ tips }) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-4">
    <div className="flex items-center gap-2 mb-2">
      <Lightbulb className="text-yellow-500 w-6 h-6" />
      <span className="font-semibold text-yellow-800">Dicas de Uso</span>
    </div>
    <ul className="space-y-2">
      {tips.map((tip, idx) => (
        <li key={idx} className="pl-2 border-l-4 border-yellow-300">
          <div className="font-medium text-yellow-900">{tip.title}</div>
          <div className="text-yellow-800 text-sm">{tip.description}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default TipsCard;
