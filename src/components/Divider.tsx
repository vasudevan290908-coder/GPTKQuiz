import React from 'react';

interface DividerProps {
  label?: string;
  bgColor?: string;
}

export const Divider: React.FC<DividerProps> = ({ label = 'OR', bgColor = 'bg-[#0B132B]' }) => {
  return (
    <div className="relative flex items-center justify-center my-6">
      <div className="w-full border-t-2 border-gray-600"></div>
      <span className={`absolute ${bgColor} text-white px-3.5 py-0.5 font-black text-xs uppercase border-2 border-white rounded-md`}>
        {label}
      </span>
    </div>
  );
};
