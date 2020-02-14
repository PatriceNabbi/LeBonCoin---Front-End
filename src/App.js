import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import Header from "./components/Header";
import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import "./assets/Style/App.css";
import SearchBar from "./components/SearchBar";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faUserAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faUserAlt);

function App() {
  //Récupération via Cookie.set du token enregistré dans le container LogIn qu'on enfermera dans une variable "tokenFromCookie"
  const tokenFromCookie = Cookies.get("userToken");
  const [search, setSearch] = useState("");

  let tokenState;
  if (tokenFromCookie) {
    tokenState = { userToken: tokenFromCookie };
  } else {
    tokenState = null;
  }

  const [user, setUser] = useState(tokenState);

  return (
    <Router>
      <Header user={user} setUser={setUser} />

      <div className="orange-ruban"></div>
      <Switch>
        <Route path="/offers/:id">
          {/* Création de la page d'offres qui sera la page "Offer" --> les pages doivent toujours être organisés avec le sommet le plus micro qui redescend vers le plus macro */}
          <div>
            <Offer />
          </div>
        </Route>
        <Route path="/sign_up">
          {/* Création de la page de connexion qui sera la page "Sign_Up" --> container : SignUp*/}
          <SignUp />
        </Route>

        <Route path="/log_in">
          <LogIn setUser={setUser} />

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
