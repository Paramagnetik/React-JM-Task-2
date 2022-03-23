/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ItemsFilm from '../ItemsFilm/ItemsFilm';
import './ListFilm.css';

function ListFilm({ films, debouncedOnChange, filmsGenre, guestSession, activeTab, value, isLoading }) {
    const searchNone = activeTab === "rate" ? "list-search-none" : "list-search";

    return (
        <ul className='list'>
            <Input placeholder="Type to search..." className={searchNone} onChange={debouncedOnChange} />

            {films.length === 0 && value.length > 0 ? <h1>not found films</h1> : isLoading ? <Spin size="large" /> :
                films.map((elem) => (<ItemsFilm title={elem.title} img={elem.poster_path} overview={elem.overview} date={elem.release_date} filmsId={elem.id} genre={elem.genre_ids} filmsGenre={filmsGenre} rating={elem.rating} guestSession={guestSession} key={uuidv4()} />))}
        </ul>
    )
}

ListFilm.defaultProps = {
    films: [],
    debouncedOnChange: () => "",
    filmsGenre: [],
    guestSession: "",
    activeTab: "",
    value: "",
    isLoading: true
}

ListFilm.propTypes = {
    films: PropTypes.arrayOf(PropTypes.object),
    debouncedOnChange: PropTypes.func,
    filmsGenre: PropTypes.arrayOf(PropTypes.object),
    guestSession: PropTypes.string,
    activeTab: PropTypes.string,
    value: PropTypes.string,
    isLoading: PropTypes.bool
}

export default ListFilm;