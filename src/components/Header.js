import React from "react";
import Logo from "../assets/img/logo le bon coin.png";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import LogIn from "../containers/LogIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ user, setUser }) {
  const history = useHistory();
  return (
    <header className="topbar">
      <div className="wrapper">
        <Link to="/">
          <img src={Logo} alt="Le bon coin" />
        </Link>
        <ul>
          <li style={{ width: 400 }}>
            <button>+</button>
            <span>Déposer une annonce</span>{" "}
            {/* englober avec deux balises Link + créer les routes */}
          </li>
          <li>
            <FontAwesomeIcon icon="search" /> Recherche
          </li>
          <div className="connection">
            <FontAwesomeIcon icon="user-alt" style={{ fontSize: 16 }} />
            {user === null ? (
              <Link to="/log_in">Se connecter</Link>
            ) : (
              <button
                className="disconnect"
                onClick={() => {
                  // En se déconnectant :
                  // 1. Suppression du cookie userToken
                  Cookies.remove("userToken");

                  // 2. Mettre l'état user à null
                  setUser(null);

                  // 3. Aller sur la page d'accueil
                  history.push("/");
                }}
              >
                Se déconnecter
              </button>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
}

export default Header;
