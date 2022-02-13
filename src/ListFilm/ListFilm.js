import React from 'react';
import PropTypes from 'prop-types';
import { Input, Tabs } from 'antd';
import ItemsFilm from '../ItemsFilm/ItemsFilm';
import './ListFilm.css';

const { TabPane } = Tabs;

function Demo() {
    return <Tabs defaultActiveKey="1">
        <TabPane tab="Search" key="1" />
        <TabPane tab="Rated" key="2" />
    </Tabs>
}

function ListFilm({ films, debouncedOnChange, filmsGenre }) {
    return (
        <ul className='list'>
            <Demo />
            <Input placeholder="Type to search..." className='list-search' onChange={debouncedOnChange} />
            {films.length === 0 ? <h1>movie not found</h1> :
                films.map((el) => (<ItemsFilm title={el.title} img={el.poster_path} overview={el.overview} date={el.release_date} key={el.id} genre={el.genre_ids} filmsGenre={filmsGenre} vote={el.vote_average} />))}
        </ul>
    )
}

ListFilm.defaultProps = {
    films: [],
    debouncedOnChange: () => "",
    filmsGenre: []
}

ListFilm.propTypes = {
    films: PropTypes.arrayOf(PropTypes.object),
    debouncedOnChange: PropTypes.func,
    filmsGenre: PropTypes.arrayOf(PropTypes.object)
}

export default ListFilm;