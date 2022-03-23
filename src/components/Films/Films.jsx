import React, { useContext } from 'react';
import _debounce from 'lodash/debounce';
import { Pagination, Alert } from 'antd';
import PropTypes from 'prop-types';
import ListFilm from '../ListFilm/ListFilm';
import FilmsGenreContext from "../contex/Contex";

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

function Films({ guestSession }) {
  const [films, setFilms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [current, setCurrent] = React.useState(1);
  const [total, setTotal] = React.useState(null);
  const [isError, setError] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const { filmsGenre } = useContext(FilmsGenreContext)

  React.useEffect(() => {
    let isCancel = false
    setIsLoading(true)
    async function init() {
      if (!isCancel && value.trim()) {
        const movies = await getFilms.getResource(current, value);
        setFilms(movies.results);
        setTotal(movies.total_results);
        setInputValue(value)
      }
    }

    init().then(() => { setError(false); setIsLoading(false) }
    ).catch(() => setError(true))

    return () => { isCancel = true }
  }, [current, value])

  const debouncedOnChange = _debounce(((event) => {
    if (event.target.value.length === 0) {
      setValue("");
      setFilms([]);
      setTotal(null);
      setInputValue("")
      return
    }

    setValue(event.target.value);
  }), 300)

  const onChange = (page) => {
    setCurrent(page);
  };

  if (isError) {
    return <Alert message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
      type="warning"
      closable
    />
  }

  return (
    <> <ListFilm films={films} filmsGenre={filmsGenre.genres} debouncedOnChange={debouncedOnChange} guestSession={guestSession} value={inputValue} isLoading={isLoading} />
      <Pagination current={current} total={total} onChange={onChange} className='pagination' showSizeChanger={false} /></>
  )
}

Films.defaultProps = {
  guestSession: "",
}

Films.propTypes = {
  guestSession: PropTypes.string,
}

export default Films;