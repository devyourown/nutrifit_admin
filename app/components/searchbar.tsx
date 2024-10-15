"use client";

import { useState } from "react";

interface SearchbarProps {
    debouncedSearch: (query: string) => void;
}

export default function Searchbar({debouncedSearch}: SearchbarProps) {
    const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };
    return (
        <div className="flex justify-between items-center mb-6">
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="검색..."
                      className="border border-gray-300 rounded-lg py-2 px-4"
                  />
              </div>
    )
}