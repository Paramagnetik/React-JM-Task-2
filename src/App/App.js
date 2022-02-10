/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Pagination, Spin, Alert } from 'antd';
import { Offline } from "react-detect-offline";
import "./App.css";
import ListFilm from '../ListFilm/ListFilm';

const getFilms = {
  async getResource(currentPage, value) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=89e18e7c29b68fe0aa104ac7ae2955eb&query=${value}&page=${currentPage}`)

    if (!res.ok) {
      throw new Error(`error`)
    }
    const body = await res.json()
    return body
  }
}

function App() {
  const [films, setFilms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [current, setCurrent] = React.useState(1);
  const [total, setTotal] = React.useState(null);
  const [isError, setError] = React.useState(false);
  const [value, setValue] = React.useState("star");

  function onValue(ev) {
    setValue(ev.target.value);
  }

  React.useEffect(() => {
    async function init() {
      const movies = await getFilms.getResource(current, value);

      setFilms(movies.results);
      setTotal(movies.total_results);
      setIsLoading(false);
    }
    init().then(() => setError(false)).catch(() => setError(true))
  }, [current, value])

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
    <ListFilm films={films} onValue={onValue} />
    <Pagination current={current} total={total} onChange={onChange} className='pagination' showSizeChanger={false} />
  </div>
}

export default App