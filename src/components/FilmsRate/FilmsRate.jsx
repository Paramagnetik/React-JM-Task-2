import React, { useContext } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import ListFilm from '../ListFilm/ListFilm';
import FilmsGenreContext from "../contex/Contex";

const getFilmsRate = {
    async getRatedMovies(guestSession, currentPage) {
        const getMovies = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies?api_key=89e18e7c29b68fe0aa104ac7ae2955eb&language=en-US&sort_by=created_at.asc&page=${currentPage}`);

        if (!getMovies.ok) {
            throw new Error(`error`)
        }

        const rate = await getMovies.json();
        return rate
    }
}

function FilmsRate({ guestSession, activeTab }) {
    const [films, setFilms] = React.useState([]);
    const [current, setCurrent] = React.useState(1);
    const [total, setTotal] = React.useState(null);

    const { filmsGenre } = useContext(FilmsGenreContext);
    React.useEffect(() => {
        let isCancel = false
        async function init() {
            const movies = await getFilmsRate.getRatedMovies(guestSession, current);

            if (!isCancel) {
                setFilms(movies.results);
                setTotal(movies.total_results);
            }

        }
        init()

        return () => { isCancel = true }
    }, [guestSession, current])

    const onChange = (page) => {
        setCurrent(page);
    };
    return (
        <>
            {films.length === 0 ? <h1>no rated films</h1> : <ListFilm films={films} filmsGenre={filmsGenre.genres} guestSession={guestSession} activeTab={activeTab} />}
            < Pagination current={current} total={total} onChange={onChange} className='pagination' showSizeChanger={false} /></>
    )
}

FilmsRate.defaultProps = {
    guestSession: "",
    activeTab: ""
}

FilmsRate.propTypes = {
    guestSession: PropTypes.string,
    activeTab: PropTypes.string
}

export default FilmsRate;