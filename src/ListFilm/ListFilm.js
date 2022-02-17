import React from 'react';
import PropTypes from 'prop-types';
import { Input, Tabs } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ItemsFilm from '../ItemsFilm/ItemsFilm';
import './ListFilm.css';

const { TabPane } = Tabs;

function Demo({ guestSession }) {

    const onChangeRated = (key) => {
        console.log(key)
        async function getRatedMovies() {
            const getMovies = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies?api_key=89e18e7c29b68fe0aa104ac7ae2955eb&language=en-US&sort_by=created_at.asc`);
            const rate = await getMovies.json();
            return rate
        }
        if (key == 2) {
            getRatedMovies().then(el => console.log(el))
        }

    }

    return <Tabs defaultActiveKey="1" onTabClick={onChangeRated}>
        <TabPane tab="Search" key="1" />
        <TabPane tab="Rated" key="2" />
    </Tabs>
}

function ListFilm({ films, debouncedOnChange, filmsGenre, guestSession }) {

    return (
        <ul className='list'>
            <Demo guestSession={guestSession} />
            <Input placeholder="Type to search..." className='list-search' onChange={debouncedOnChange} />
            {films.length === 0 ? <h1>movie not found</h1> :
                films.map((el) => (<ItemsFilm title={el.title} img={el.poster_path} overview={el.overview} date={el.release_date} filmsId={el.id} genre={el.genre_ids} filmsGenre={filmsGenre} guestSession={guestSession} key={uuidv4()} />))}
        </ul>
    )
}

ListFilm.defaultProps = {
    films: [],
    debouncedOnChange: () => "",
    filmsGenre: [],
    guestSession: ""
}

ListFilm.propTypes = {
    films: PropTypes.arrayOf(PropTypes.object),
    debouncedOnChange: PropTypes.func,
    filmsGenre: PropTypes.arrayOf(PropTypes.object),
    guestSession: PropTypes.string
}

Demo.defaultProps = {
    guestSession: ""
}

Demo.propTypes = {
    guestSession: PropTypes.string
}

export default ListFilm;