// SearchBar.tsx
import React, { useContext } from 'react';
import { ProductContext } from '../context/productContext';

interface ProductContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(ProductContext) as ProductContextType;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="input input-bordered mr-2 "
        style={{ width: "350px" }} 
      />
      <button type="submit" className="btn bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95 px-2 py-1">
        Search
      </button>
    </form>
  );
};

export default SearchBar;