import { ReactNode } from "react";

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
  }
  
  export default function Modal({ onClose, children }: ModalProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <button className="absolute top-2 right-2" onClick={onClose}>
            ✖
          </button>
          {children}
        </div>
      </div>
    );
  }
  