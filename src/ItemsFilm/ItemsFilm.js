import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import './Items-style.css';
import { format } from 'date-fns';


export default function ItemsFilm({ title, date, img, overview }) {
    function textOverflow(string) {
        const index = string.slice(0, 208).lastIndexOf(" ");
        const newOverview = `${string.slice(0, index)}...`;
        return newOverview
    }


    return (
        <li className="list-items">

            <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="Poster" className='list-items__img' />
            <div className='list-items-container'>
                <div className='list-title'><h1 className='list-items-container__title'>{title}</h1><span className="ellipse"> 1</span ></div>
                <span className='list-items-container__time'>{format(new Date(date), 'MMMM dd, yyyy')}</span>
                <div className='button-grup'>
                    <button type="button" className='button button-grup__Action'>Action</button>
                    <button type="button" className='button button-grup__Drama'>Drama</button>
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
}

ItemsFilm.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    img: PropTypes.string,
    overview: PropTypes.string,
}
