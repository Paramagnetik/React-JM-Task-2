import React from 'react';
import PropTypes, { number } from 'prop-types';
import { Rate } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './Items-style.css';
import { format } from 'date-fns';

export default function ItemsFilm({ title, date, img, overview, genre, filmsGenre, filmsId, guestSession, rating }) {
    const [vote, setVote] = React.useState(rating || 0);

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


    const onChangeVote = (rate) => {
        async function changeVote() {
            await fetch(`https://api.themoviedb.org/3/movie/${filmsId}/rating?api_key=89e18e7c29b68fe0aa104ac7ae2955eb&guest_session_id=${guestSession}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },

                body: JSON.stringify({
                    "value": rate
                })
            });
        }
        changeVote();
        setVote(rate);
    }

    function voteColor() {
        if (vote < 3) {
            return { borderColor: "#E90000" }
        }

        if (vote < 3 > 5) {
            return { borderColor: "#E97E00" }
        };

        if (vote < 5 > 7) {
            return { borderColor: "#E9D100" }
        };

        if (vote > 7) {
            return { borderColor: "#66E900" }
        };

        return { borderColor: "#E9D100" }
    }
    return (
        <li className="list-items">
            <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="Poster" className='list-items__img' />
            <div className='list-items-container'>
                <div className='list-title'><h1 className='list-items-container__title'>{title}</h1><span className="ellipse" style={voteColor()}>{rating || vote}</span ></div>
                <span className='list-items-container__time'>{format(new Date(date || new Date()), 'MMMM dd, yyyy')}</span>
                <div className='button-grup'>
                    {genreText.map((elem) => <button type="button" className='button button-grup__Action' key={uuidv4()}>{elem}</button>)}
                </div>
                <p className="list-items-container__wrapper">{overview.length > 208 ? textOverflow(overview) : overview}</p>
                <Rate className='rate' count="10" allowHalf="true" value={rating || vote} onChange={onChangeVote} />
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
    filmsId: number,
    rating: 0,
    guestSession: ""
}

ItemsFilm.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    img: PropTypes.string,
    overview: PropTypes.string,
    genre: PropTypes.arrayOf(PropTypes.number),
    filmsGenre: PropTypes.arrayOf(PropTypes.object),
    filmsId: PropTypes.number,
    rating: PropTypes.number,
    guestSession: PropTypes.string
}