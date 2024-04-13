import React from 'react';

function SearchBar() {
    return (
      <div className="search-bar">
        <input className="srch-bar "type="text" name="query" placeholder="Search events..." required />
        {/* Tutaj możesz dodać obsługę wyszukiwania */}
      </div>
    );
  }
  export default SearchBar;