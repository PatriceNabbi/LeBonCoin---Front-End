import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import Logo from "./assets/img/logo le bon coin.png";
import "./assets/Style/App.css";
import SearchBar from "./components/SearchBar";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import Cookies from "js-cookie";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faSearch, faHome } from "@fortawesome/free-solid-svg-icons";
// library.add(faStar, faHome);
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  //Récupération via Cookie.set du token enregistré dans le container LogIn qu'on enfermera dans une variable "tokenFromCookie"
  const tokenFromCookie = Cookies.get("userToken");
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("")

  let tokenState;
  if (tokenFromCookie) {
    tokenState = { token: tokenFromCookie };
  } else {
    tokenState = null;
  }

  const [user, setUser] = useState(tokenState);

  return (
    <Router>
      {user === null ? <Redirect to="/sign_up" /> : null}
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
              {user === null ? (
                <Link to="/log_in"></Link>
              ) : (
                <button
                  onclick={() => {
                    Cookies.remove("userToken");
                    setUser(null);
                  }}
                >
                  Se déconnecter
                </button>
              )}
              <LogIn name={name} setName={setName} email={email} setEmail={setEmail} password1={password1} setPassword1={setPassword1} password2={password2} setPassword2={setPassword2}/>
            </div>
          </ul>
        </div>
      </header>

      <div className="orange-ruban"></div>
      <Switch>
        <Route path="/offers/:id">
          {/* Création de la page d'offres qui sera la page "Offer" --> les pages doivent toujours être organisés avec le sommet le plus micro qui redescend vers le plus macro */}
          <div>
            <Offer />
          </div>
        </Route>
        <Route path="/sign_up">
          <div>
            <SignUp />
          </div>

          {/* Création de la page de connexion qui sera la page "Sign_Up" --> container : SignUp*/}
        </Route>

        <Route path="/log_in">
          {/* Création de la page de connexion qui sera la page "Log_in" --> container : LogIn*/}
        </Route>

        <Route path="/">
          <div className="home-page">
            <Offers />
          </div>

          {/* Création de la page d'accueil qui sera la page "Offers" */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
