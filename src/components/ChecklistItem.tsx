'use client';
import React from 'react'; // Removido useState

interface ChecklistItemProps {
  label: string;
  isChecked: boolean; // Adicionado isChecked
  onChange: (isChecked: boolean) => void; // Adicionado onChange
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ label, isChecked, onChange }) => {
  // Removido useState interno
  // const [checked, setChecked] = useState(false);

  const handleChange = () => {
    onChange(!isChecked); // Chama a função onChange do pai com o novo estado
  };

  return (
    // Usa isChecked da prop e chama handleChange no clique
    <li className={`flex items-center mb-2 cursor-pointer ${isChecked ? 'text-green-700 line-through' : 'text-gray-700'}`} onClick={handleChange}>
      <input
        type="checkbox"
        id={`checklist-${label.replace(/\s+/g, '-')}`}
        className="mr-3 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
        checked={isChecked} // Usa isChecked da prop
        onChange={handleChange} // Chama handleChange no onChange do input
        aria-checked={isChecked} // Melhora acessibilidade
      />
      <label htmlFor={`checklist-${label.replace(/\s+/g, '-')}`} className={`select-none cursor-pointer ${isChecked ? 'line-through' : ''}`}>
        {label}
      </label>
    </li>
  );
};

export default ChecklistItem;