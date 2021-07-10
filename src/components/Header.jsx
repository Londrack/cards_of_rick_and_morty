import React, { useState /*, useContext*/ } from 'react';
//import ThemeContext from '../context/ThemeContext';

import '../css/Header.css'

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);
    //const color = useContext(ThemeContext);

    const handleClick = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark');
    }
    return (
        <div className="Header">
            <h1>Cards of Rick & Morty</h1>
            <div onClick={handleClick} className={!darkMode ? 'controlMode dark' : 'controlMode light'}>
                {!darkMode ?
                    <img src="https://img.icons8.com/ios/50/000000/light-on--v1.png"/> :
                    <img src="https://img.icons8.com/ios/50/000000/light-off.png"/>
                }
            </div>
        </div>
    )
}
