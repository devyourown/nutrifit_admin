import React, { useState } from 'react';

interface FiltersProps {
  onFilterChange: (status: string) => void;
  kindOfFilters: string[];
}

export default function Filters({  kindOfFilters, onFilterChange }: FiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  function handleFilterChange(filter: string) {
    setSelectedFilter(filter);
  }

  function applyFilters() {
    onFilterChange(selectedFilter);
    // 여기에 필터링 로직을 추가하여 API 호출을 통해 제품을 필터링할 수 있습니다.
  }

  return (
    <div className="absolute top-12 left-0 bg-white border border-gray-300 p-4 rounded shadow-lg w-64 z-10">
        {kindOfFilters.map((kind) => {
            return (
                <div key={kind} className="mb-2">
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={selectedFilter.includes(kind)}
                    onChange={() => handleFilterChange(kind)}
                    />
                    <span className="ml-2">{kind}</span>
                </label>
                </div>
            )
        })}
      <div className="flex justify-between mt-8">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={() => setSelectedFilter('')}>
          제거
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={applyFilters}
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
