import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import Logo from "./assets/img/logo le bon coin.png";
import "./assets/Style/App.css";
import SearchBar from "./components/SearchBar";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faSearch, faHome } from "@fortawesome/free-solid-svg-icons";
// library.add(faStar, faHome);
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <Router>
        <header className="topbar">
          <div className="wrapper">
            <img src={Logo} alt="Le bon coin" />
            <ul>
              <li style={{ width: 400 }}>
                <button>+</button>
                <span>Déposer une annonce</span>
              </li>
              <li>{/* <FontAwesomeIcon icon="search" /> */} Recherche</li>
              <div className="connection">
                <span> se connecter</span>
              </div>
            </ul>
          </div>
        </header>
        <menu>
          <div className="search-menu">
            <SearchBar name={name} setName={setName} />
          </div>
        </menu>
        <div className="orange-ruban"></div>

        <Switch>
          <Route path="/offers/:id">
            {/* Création de la page d'offres qui sera la page "Offer" --> les pages doivent toujours être organisés avec le sommet le plus micro qui redescend vers le plus macro */}
            <div>
              <Offer />
            </div>
          </Route>
          <Route path="/">
            <div className="home-page">
              <Offers />
            </div>

            {/* Création de la page d'accueil qui sera la page "Offers" */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
