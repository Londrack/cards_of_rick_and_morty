import { useState, useEffect } from "react";

const useCharacters = url => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchData = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setCharacters(characters => [...characters, ...data.results]);
            if(data.info.next){
                setTimeout(fetchData(data.info.next), 0);
            }else{
                setLoading(false)
            }
        })
    }

    useEffect( ()=> {
        setTimeout(fetchData(url), 0);
    }, [url])

    return {
        characters,
        loading,
        fetchData
    };
}

export default useCharacters;