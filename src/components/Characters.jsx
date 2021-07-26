import React from 'react';
import '../css/Characters.css';


export default function Characters({
        claseNameCharacter,
        favorites,
        loading,
        filteredCharacters,
        addFavorite,
        imgStatus,
        imgGender,
        toggleClass
    }) {

    return (
        (loading) ?
            <div>
                <p>LOADING...</p>
            </div>
        :
            <div>
                <div className="favoritesBox">
                    {/* {(favorites.favorites.length !== 0) && <h3>Favorites: </h3>} */}
                    {favorites.favorites.map(favorite => (
                        <a href={"#card"+favorite.id} className="favCharacter" key={favorite.id}>
                            <img alt={favorite.name} src={favorite.image} />
                        </a>
                    ))}
                    {/* {(favorites.favorites.length > 4) && 
                        <a href="#" className="favCharacter" key="0">All Favs</a>
                    } */}
                </div>

                <div className="charactersGeneralBox">
                    <div id="allCardsBox">
                        {filteredCharacters.map(character => (
                        <div className="cardBox" key={character.id} id={"card"+character.id}>
                                <div className="card">
                                    <div className="face front">
                                        <div className="contenido">
                                            <span
                                                readonly="readonly"
                                                className="label info"
                                                title="More info"
                                                onClick={() => toggleClass(character.id, "flip")}>

                                                <i class="fas fa-info-circle"></i>
                                            </span>

                                            <span
                                                readonly="readonly"
                                                title="Add to Favorite"
                                                className={favorites.favorites.find(item => item.id === character.id)
                                                    ? "label fav"
                                                    : "label fav off"}
                                                type="button"
                                                onClick={() => addFavorite(character)}>

                                                <i class="far fa-star"></i>
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
                                            <span className="infoButton" title="More info" onClick={() => toggleClass(character.id, "flip")}>
                                                <img alt="flip" src="https://img.icons8.com/ios-filled/50/000000/reply-arrow.png"/>
                                            </span>
                                            <h2>{character.name}</h2>
                                            {(character.type) && <p><strong>* Type:</strong> {character.type}</p>}
                                            {(character.gender) && <p><strong>* Gender:</strong> {character.gender}</p>}
                                            {(character.status) && <p><strong>* Status:</strong> {character.status}</p>}
                                            {(character.origin) && <p><strong>* Origin:</strong> {character.origin.name}</p>}
                                            {(character.location) && <p><strong>* Location:</strong> {character.location.name}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    )
}
