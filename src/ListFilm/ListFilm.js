import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ItemsFilm from '../ItemsFilm/ItemsFilm';
import './ListFilm.css';

function ListFilm({ films, debouncedOnChange, filmsGenre, guestSession, activeTab }) {
   
    const searchNone = activeTab === "rate" ? "list-search-none" : "list-search";
    return (
        <ul className='list'>

            <Input placeholder="Type to search..." className={searchNone} onChange={debouncedOnChange} />
            {films.length === 0 ? <h1>movie not found</h1> :
                films.map((el) => (<ItemsFilm title={el.title} img={el.poster_path} overview={el.overview} date={el.release_date} filmsId={el.id} genre={el.genre_ids} filmsGenre={filmsGenre} guestSession={guestSession} key={uuidv4()} />))}
        </ul>
    )
}

ListFilm.defaultProps = {
    films: [],
    debouncedOnChange: () => "",
    filmsGenre: [],
    guestSession: "",
    activeTab: ""
}

ListFilm.propTypes = {
    films: PropTypes.arrayOf(PropTypes.object),
    debouncedOnChange: PropTypes.func,
    filmsGenre: PropTypes.arrayOf(PropTypes.object),
    guestSession: PropTypes.string,
    activeTab: PropTypes.string
}

export default ListFilm;