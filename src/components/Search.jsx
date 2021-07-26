import React from 'react'

const Search = ({search, searchInput, handleSearch}) => {
    return (
        <div className="Search">
            <input
                type="text"
                placeholder="Search character"
                ref={searchInput}
                value={search}
                onChange={handleSearch} />
        </div>
    )
}

export default Search
