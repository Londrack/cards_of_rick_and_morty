import React, {useState, useReducer, useMemo, useRef, useCallback} from 'react';
import Header from './Header';
import Characters from './Characters';

import favoriteReducer from '../reducers/favoriteReducer';
import useCharacters from '../hooks/useCharacters';

const initialState = {
    favorites: []
}

const API = 'https://rickandmortyapi.com/api/character';

const Layout = () => {

    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
    const [search, setSearch] = useState('')
    const searchInput = useRef(null)

    const consult = useCharacters(API)
    const characters = consult.characters
    const loading = consult.loading
    const loadingStatus = consult.loadingStatus

    const claseNameCharacter = (name) => {
        let clas = "characterName";
        clas += (name.length > 16) ? " mini1" : "";
        return clas;
    }

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, [])

    const filteredCharacters = useMemo(()=>
        characters.filter((char)=>{
            return char.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters, search]
    )

    const addFavorite = favorite => {
        document.querySelector(`#card${favorite.id} .fav`).classList.toggle("off");
        dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
    }

    const imgStatus = (status) => {
        switch(status){
            case 'Dead':
                return <img alt="Dead" title="Dead" src="https://img.icons8.com/material-rounded/50/000000/skull.png"/>;
            case 'Alive':
                return <img alt="Alive" title="Alive" src="https://img.icons8.com/ios-filled/48/000000/heart-with-pulse--v1.png"/>;
            case 'unknown':
                return <img alt="unknown" title="unknown" src="https://img.icons8.com/material/50/000000/help--v2.png"/>
            default:
                return '';
        }
    }

    const imgGender = (gender) => {
        switch(gender){
            case 'Female':
                return <img alt="Female" title="Female" src="https://img.icons8.com/material-outlined/50/000000/female.png"/>
            case 'Male':
                return <img alt="Male" title="Male" src="https://img.icons8.com/ios-filled/50/000000/male.png"/>
            case 'Genderless':
                return <img alt="Genderless" title="Genderless" src="https://img.icons8.com/ios-filled/50/000000/agender-symbol.png"/>
            case 'unknown':
                return <img alt="unknown" title="unknown" src="https://img.icons8.com/material/50/000000/help--v2.png"/>
            default:
                return '';
        }
    }

    const toggleClass = (id, cls) => {
        document.querySelector(`#card${id}`).classList.toggle(cls);
    };


    return (
        <>
            <Header
                search={search}
                searchInput={searchInput}
                handleSearch={handleSearch}
            />
            <Characters
                claseNameCharacter={claseNameCharacter}
                favorites={favorites}
                loading={loading}
                filteredCharacters={filteredCharacters}
                addFavorite={addFavorite}
                imgStatus={imgStatus}
                imgGender={imgGender}
                toggleClass={toggleClass}
                loadingStatus={loadingStatus}
            />
        </>
    )
}

export default Layout
