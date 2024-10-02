import { useState } from 'react';
import { OptionDto } from '@/app/lib/types';

interface VariantsProps {
  onAddOption: (option: OptionDto) => void;
}

const Variants: React.FC<VariantsProps> = ({ onAddOption }) => {
    const [options, setOptions] = useState<OptionDto[]>([]);
  const [optionInput, setOptionInput] = useState<OptionDto>({
    quantity: 0,
    price: 0,
    description: '',
  });

  const handleInputChange = (field: keyof OptionDto, value: any) => {
    setOptionInput(prev => ({ ...prev, [field]: value }));
  };

  const handleAddOption = () => {
    if (optionInput.description.trim()) {
        const newOption = { ...optionInput, }; // Ensure each option has a unique ID
        setOptions(prev => [...prev, newOption]);
        onAddOption(newOption);
        setOptionInput({ quantity: 0, price: 0, description: '' }); // Reset the input fields
      }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">상품 옵션</h2>
      <p className="text-sm text-gray-600 mb-4">
        옵션을 추가하여 상품을 개수, 크기, 특징별로 따로 판매할 수 있습니다.
      </p>

      {/* Product options input fields */}
      <div className='mb-4 '><input
          type="text"
          className="border w-full p-2 rounded"
          value={optionInput.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="설명"
        /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          className="border w-full p-2 rounded"
          onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
          placeholder="개수"
        />
        <input
          type="number"
          className="border w-full p-2 rounded"
          onChange={(e) => handleInputChange('price', Number(e.target.value))}
          placeholder="가격"
        />
        <button type='button' onClick={handleAddOption} className="col-span-1 md:col-span-2 bg-blue-500 text-white px-4 py-2 rounded mt-4">
          옵션 추가하기
        </button>
      </div>
      {options.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">추가된 옵션들:</h3>
          <ul>
            {options.map(option => (
              <li key={option.description} className="mt-2">
                {`설명: ${option.description}, 개수: ${option.quantity}, 가격: ${option.price}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Variants;
