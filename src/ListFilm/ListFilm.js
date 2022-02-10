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

function ListFilm({ films, onValue }) {

    return (
        <ul className='list'>
            <Demo />
            <Input placeholder="Type to search..." className='list-search' onChange={(ev) => onValue(ev)} />
            {films.map((el) => (<ItemsFilm title={el.title} img={el.poster_path} overview={el.overview} date={el.release_date} key={el.id} />))}

        </ul>
    )
}

ListFilm.defaultProps = {
    films: [],
    onValue: () => ""
}

ListFilm.propTypes = {
    films: PropTypes.arrayOf(PropTypes.object),
    onValue: PropTypes.func

}

export default ListFilm;