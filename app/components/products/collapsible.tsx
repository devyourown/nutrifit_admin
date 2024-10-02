import React, { useState, ReactNode } from 'react';

interface CollapsibleProps {
  label: string;
  children?: ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button type='button' className="w-full text-left py-3 px-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-center font-semibold">
          {label}
          <span>{isOpen ? '-' : '+'}</span>
        </div>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

export default Collapsible;
