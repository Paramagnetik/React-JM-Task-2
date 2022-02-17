/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Pagination, Spin, Alert } from 'antd';
import { Offline } from "react-detect-offline";
import _debounce from 'lodash/debounce';
import "./App.css";
import ListFilm from '../ListFilm/ListFilm';

const getFilms = {
  async getResource(currentPage, value) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=89e18e7c29b68fe0aa104ac7ae2955eb&query=${value}&page=${currentPage}`);

    if (!res.ok) {
      throw new Error(`error`)
    }

    const body = await res.json()
    return body
  }
}

async function getGenre() {
  const genreArr = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=89e18e7c29b68fe0aa104ac7ae2955eb&language=en-US`);

  const genre = await genreArr.json();
  return genre
}

async function getGuestSession() {
  const guestSession = await fetch("https://api.themoviedb.org/3/authentication/guest_session/new?api_key=89e18e7c29b68fe0aa104ac7ae2955eb");
  const sesion = await guestSession.json();
  return sesion
}

function App() {
  const [guestSession, setguestSession] = React.useState({});
  const [films, setFilms] = React.useState([]);
  const [filmsGenre, setFilmsGenre] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true);
  const [current, setCurrent] = React.useState(1);
  const [total, setTotal] = React.useState(null);
  const [isError, setError] = React.useState(false);
  const [value, setValue] = React.useState("star");


  React.useEffect(() => {
    let isCancel = false
    async function init() {

      const movies = await getFilms.getResource(current, value);
      const genre = await getGenre();
      const session = await getGuestSession();

      if (!isCancel) {
        setguestSession(session.guest_session_id)
        setFilms(movies.results);
        setTotal(movies.total_results);
        setFilmsGenre(genre)
      }

      setIsLoading(false);
    }
    init().then(() => setError(false)
    ).catch(() => setError(true))

    return () => { isCancel = true }
  }, [current, value])

  const debouncedOnChange = _debounce(((ev) => {
    if (ev.target.value.length === 0) {
      setValue("star")
      return
    }
    setValue(ev.target.value)
  }), 500)

  function onChange(page) {
    setCurrent(page);
  };

  if (isError) {
    return <Alert message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
      type="warning"
      closable
    />
  }

  if (isLoading) {
    return <Spin size="large" />
  }

  return <div>
    <Offline><Alert message="Ошибка сети"
      type="warning"
      closable
    /></Offline>
    <ListFilm films={films} filmsGenre={filmsGenre.genres} debouncedOnChange={debouncedOnChange}  guestSession={guestSession}/>
    <Pagination current={current} total={total} onChange={onChange} className='pagination' showSizeChanger={false} />
  </div>
}

export default App