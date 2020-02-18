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
import Publish from "./containers/Publish";
import "./assets/Style/App.css";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faClock,
  faBell,
  faEye,
  faPlusSquare
} from "@fortawesome/free-regular-svg-icons";
library.add(
  faSearch,
  faUser,
  faClock,
  faBell,
  faEye,
  faPlusSquare,
  faShoppingCart
);

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

      <Switch>
        <Route path="/pay">
          {/* Création de la page de paiement qui sera la page pay */}
        </Route>
        <Route path="/publish">
          {/* Création de la page d'offres qui sera la page "Offer" */}

          <div>
            <Publish />
          </div>
        </Route>

        <Route path="/offer/:id">
          {/* Création de la page d'offres qui sera la page "Offer" --> les pages doivent toujours être organisés avec le sommet le plus micro qui redescend vers le plus macro */}
          <div>
            <Offer user={user} />
          </div>
        </Route>
        <Route path="/sign_up">
          {/* Création de la page de connexion qui sera la page "Sign_Up" --> container : SignUp*/}
          <SignUp setUser={setUser} />
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
