import React from "react";
import Logo from "../assets/img/logo le bon coin.png";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import LogIn from "../containers/LogIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ user, setUser }) {
  const history = useHistory();
  const tokenFromCookie = Cookies.get("userToken");
  return (
    <header>
      <div className="wrapper">
        <Link to="/">
          <img src={Logo} alt="Le bon coin" />
        </Link>
        <ul>
          <div className="post-your-annunce">
            <li>
              <button
                onClick={() => {
                  console.log(tokenFromCookie);
                  // Gestion du post d'annonce si l'utilisateur n'a pas de compte ou n'est pas connecté
                  // 1. Check si un cookie existe
                  if (user === null) {
                    // 3. Aller sur la page d'accueil
                    history.push("/log_in");
                  } else history.push("/publish");
                }}
              >
                <FontAwesomeIcon icon={["far", "plus-square"]} /> Déposer une
                annonce
              </button>
              {/* englober avec deux balises Link + créer les routes */}
            </li>
          </div>

          <li>
            <FontAwesomeIcon icon={["fas", "search"]} /> Recherche
          </li>
          <div className="connection">
            <FontAwesomeIcon icon={["far", "user"]} style={{ fontSize: 16 }} />
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
