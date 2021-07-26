import React, { useState, useEffect } from 'react';
import Search from './Search'

import '../css/Header.css'

export default function Header({
        search,
        searchInput,
        handleSearch
    }) {
    const [darkMode, setDarkMode] = useState(false)
    const [showFixed, setShowFixed] = useState(false)

    const handleClick = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark');
    }

    useEffect(function () {
        const onScroll = e => {
          const newShowFixed = window.scrollY > 200
          showFixed !== newShowFixed && setShowFixed(newShowFixed)
        }
        document.addEventListener('scroll', onScroll)
    })
    return (
        <>
           <div className={ showFixed ? "Header fixed" : "Header"}>
                <h1>Cards of Rick & Morty</h1>
                <Search
                    search={search}
                    searchInput={searchInput}
                    handleSearch={handleSearch}
                />
            </div>
           <div
                onClick={handleClick}
                className={!darkMode
                    ? 'controlMode dark'
                    : 'controlMode light'}
            >
                {!darkMode ?
                    <img src="https://img.icons8.com/ios/50/000000/light-on--v1.png"/> :
                    <img src="https://img.icons8.com/ios/50/000000/light-off.png"/>
                }
            </div>
        </>
    )
}
