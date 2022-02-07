import React from 'react';
import PropTypes from 'prop-types';
import ItemsFilm from '../ItemsFilm/ItemsFilm';
import './ListFilm.css';

function ListFilm({ films }) {
    return (
        <ul className='list'>
            {films.slice(0, 6).map((el) => <ItemsFilm title={el.title} img={el.poster_path} overview={el.overview} date={el.release_date} key={el.id} />)}

        </ul>
    )
}

ListFilm.defaultProps = {
    films: []
}

ListFilm.propTypes = {
    films: PropTypes.arrayOf(PropTypes.object)
}

export default ListFilm;