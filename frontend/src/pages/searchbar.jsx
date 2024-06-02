import React from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="search-bar">
            <input
                className="srch-bar"
                type="text"
                name="query"
                placeholder="Search events..."
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}
export default SearchBar;
