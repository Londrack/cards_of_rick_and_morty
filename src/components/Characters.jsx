import React, {useState, useReducer, useMemo, useRef, useCallback} from 'react';
import '../css/Characters.css';
import useCharacters from '../hooks/useCharacters';
import Search from './Search';


const initialState = {
    favorites: []
}

const API = 'https://rickandmortyapi.com/api/character';

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            const isExist = state.favorites.find(item => item.id === action.payload.id)
            if (isExist){
                return {
                    ...state,
                    favorites: state.favorites.filter(item => item !== action.payload)
                }
            }else{
                return {
                    ...state,
                    favorites: [...state.favorites, action.payload]
                }
            }

        default:
            return state;
    }
}

export default function Characters() {

    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);
    const [nextPage, setNextPage] = useState('');

    const characters = useCharacters(API);

    const loadMore = () =>{
        /*fetch(nextPage)
        .then(response => response.json())
        .then(data => {
            const moreCharacters = Object.assign(characters, data.results);
            console.log(moreCharacters)
            setCharacters(moreCharacters);
            setNextPage(data.info.next);
        });*/
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
        document.querySelector(`#card${favorite.id} .favoriteButton`).classList.toggle("off");
        dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
    }

    const claseNameCharacter = (name) => {
        let clas = "characterName";
        clas += (name.length > 16) ? " mini1" : "";
        return clas;
    }

    const imgStatus = (status) => {
        switch(status){
            case 'Dead':
                return <img alt="Dead" title="Dead" src="https://img.icons8.com/material-rounded/50/000000/skull.png"/>;
            case 'Alive':
                return <img alt="Alive" title="Alive" src="https://img.icons8.com/ios-filled/48/000000/heart-with-pulse--v1.png"/>;
            case 'unknown':
                return <img alt="unknown" title="unknown" src="https://img.icons8.com/material/50/000000/help--v2.png"/>
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
        }
    }

    const toggleClass = (id, cls) => {
        document.querySelector(`#card${id}`).classList.toggle(cls);
    };

    return (
        <div>
            <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

            <div className="favoritesBox">
                {(favorites.favorites.length !== 0) && <h3>Favorites: </h3>}
                {favorites.favorites.map(favorite => (
                    <div className="favCharacter" key={favorite.id}><img alt={favorite.name} src={favorite.image} /></div>
                ))}
            </div>

            <div className="charactersGeneralBox">
                <div id="allCardsBox">
                    {filteredCharacters.map(character => (
                        <div className="cardBox" key={character.id} id={"card"+character.id}>
                            <div className="card">
                                <div className="face front">
                                    <div className="contenido">
                                        <span className={favorites.favorites.find(item => item.id === character.id) ? "favoriteButton" : "favoriteButton off"} type="button" onClick={() => addFavorite(character)}> </span>
                                        <span className="flipButton" onClick={() => toggleClass(character.id, "flip")}>
                                            <img alt="flip" src="https://img.icons8.com/ios-filled/50/000000/reply-arrow.png"/>
                                        </span>
                                        <span className={"label gender "+character.gender}>
                                            { imgGender(character.gender) }
                                        </span>
                                        <span className={"label status "+character.status}>
                                            { imgStatus(character.status) }
                                        </span>
                                        <div className="imgBox">
                                            <img alt={character.name} src={character.image} />
                                        </div>
                                        <div className={claseNameCharacter(character.name)}>
                                            <h2>{character.name}</h2>
                                            <h3>{character.species}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="face back">
                                    <div className="contenido">
                                        <span className="flipButton" onClick={() => toggleClass(character.id, "flip")}>
                                            <img alt="flip" src="https://img.icons8.com/ios-filled/50/000000/reply-arrow.png"/>
                                        </span>
                                        <h2>{character.name}</h2>
                                        {(character.type) && <p><strong>* Type:</strong> {character.type}</p>}
                                        {(character.origin) && <p><strong>* Origin:</strong> {character.origin.name}</p>}
                                        {(character.location) && <p><strong>* Location:</strong> {character.location.name}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*<button className="loadMore" onClick={loadMore()}>Load More</button>*/}

        </div>
    )
}
