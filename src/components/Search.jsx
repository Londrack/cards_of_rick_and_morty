import React from 'react'

const Search = ({search, searchInput, handleSearch}) => {
    return (
        <div className="Search">
            <input
                type="text"
                placeholder="Search in loaded characters"
                ref={searchInput}
                value={search}
                onChange={handleSearch} />
        </div>
    )
}

export default Search
