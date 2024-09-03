"use client";

import { useState } from "react";

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
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