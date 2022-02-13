import React from 'react';
import PropTypes, { number } from 'prop-types';
import { Rate } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './Items-style.css';
import { format } from 'date-fns';

export default function ItemsFilm({ title, date, img, overview, genre, filmsGenre, vote }) {
    function textOverflow(string) {
        const index = string.slice(0, 208).lastIndexOf(" ");
        const newOverview = `${string.slice(0, index)}...`;
        return newOverview
    }
    const genreText = filmsGenre.reduce((acc, elem) => {
        if (genre.includes(elem.id)) {
            acc.push(elem.name)
        }
        return acc
    }, [])

    return (

        <li className="list-items">
            <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="Poster" className='list-items__img' />
            <div className='list-items-container'>
                <div className='list-title'><h1 className='list-items-container__title'>{title}</h1><span className="ellipse">{vote}</span ></div>
                <span className='list-items-container__time'>{format(new Date(date || new Date()), 'MMMM dd, yyyy')}</span>
                <div className='button-grup'>
                    {genreText.map((el) => <button type="button" className='button button-grup__Action' key={uuidv4()}>{el}</button>)}
                </div>
                <p className="list-items-container__wrapper">{overview.length > 208 ? textOverflow(overview) : overview}</p>
                <Rate className='rate' count="10" />
            </div>
        </li>
    )
}

ItemsFilm.defaultProps = {
    title: "",
    date: "",
    img: "",
    overview: "",
    genre: [],
    filmsGenre: [],
    vote:number
}

ItemsFilm.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    img: PropTypes.string,
    overview: PropTypes.string,
    genre: PropTypes.arrayOf(PropTypes.number),
    filmsGenre: PropTypes.arrayOf(PropTypes.object),
    vote: PropTypes.number
}
