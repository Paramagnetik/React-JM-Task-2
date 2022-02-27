import React, { useMemo } from 'react';
import { Tabs, Alert } from 'antd';
import { Offline } from "react-detect-offline";
import "./App.css";
import Films from "../Films/Films";
import FilmsRate from "../FilmsRate/FilmsRate";
import FilmsGenreContext from "../Contex";

const { TabPane } = Tabs;

async function getGuestSession() {
  const guestSessionFilms = await fetch("https://api.themoviedb.org/3/authentication/guest_session/new?api_key=89e18e7c29b68fe0aa104ac7ae2955eb");
  const sesion = await guestSessionFilms.json();
  return sesion
}

async function getGenre() {
  const genreArr = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=89e18e7c29b68fe0aa104ac7ae2955eb&language=en-US`);

  const genre = await genreArr.json();
  return genre
}

function App() {
  const [guestSession, setguestSession] = React.useState("");
  const [filmsGenre, setFilmsGenre] = React.useState([])
  const [activeTab, setActiveTab] = React.useState("search");

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  React.useEffect(() => {
    async function init() {
      const session = await getGuestSession();
      setguestSession(session.guest_session_id);
      const genre = await getGenre();
      setFilmsGenre(genre)

    };
    init()
  }, [])

  const foo = useMemo(() => ({ filmsGenre, setFilmsGenre }), [filmsGenre]);

  return <div>
    <Offline><Alert message="Ошибка сети"
      type="warning"
      closable
    /></Offline>
    <React.StrictMode>
      <FilmsGenreContext.Provider value={foo}>
        <Tabs defaultActiveKey="1" onChange={handleTabClick}>
          <TabPane tab="Search" key="search" > {activeTab === "search" && <Films guestSession={guestSession} filmsGenre={filmsGenre.genres} />} </TabPane>
          <TabPane tab="Rated" key="rate" > {activeTab === "rate" && <FilmsRate guestSession={guestSession} filmsGenre={filmsGenre.genres} activeTab={activeTab}/>} </TabPane>
        </Tabs>
      </FilmsGenreContext.Provider>
    </React.StrictMode>
  </div>
}

export default App