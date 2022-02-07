import React from 'react';
import ListFilm from '../ListFilm/ListFilm'

const getFilms = {
  async getResource() {
    const res = await fetch("https://api.themoviedb.org/3/search/movie?api_key=89e18e7c29b68fe0aa104ac7ae2955eb&query=`star`");
    if (!res.ok) {
      throw new Error(`erorr`)
    }

    const body = await res.json()
    return body.results;
  }
}

function App() {
  const [films, setFilms] = React.useState([]);
  React.useEffect(() => {
    async function init() {
      const movies = await getFilms.getResource();
      setFilms(movies)
    }
    init()
  }, [])
  return <ListFilm films={films}/>
}

export default App