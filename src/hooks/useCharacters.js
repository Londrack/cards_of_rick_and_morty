import { useState, useEffect } from "react";

const useCharacters = url => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true)
    const [loadingStatus, setLoadingStatus] = useState(0)

    const fetchData = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setCharacters(characters => [...characters, ...data.results]);
            if(data.info.next){
                setTimeout(fetchData(data.info.next), 0);

                let nextPage = data.info.next
                nextPage = nextPage.split('=')
                nextPage = nextPage[1]
                nextPage = parseInt(nextPage)
                const allPages = parseInt(data.info.pages)
                const loadValue = Math.round((nextPage/allPages)*100)
                setLoadingStatus(loadValue)

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
        loadingStatus,
        fetchData
    };
}

export default useCharacters;