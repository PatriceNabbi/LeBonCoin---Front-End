import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import "../assets/Style/LogIn.css";

function LogIn({ setUser }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //1. Récupérer le token via une requête axios.post (on utilise post car c'est la soumission d'une information via le log in)
  //2. response.data est un objet (cf le console.log() donc je peux aller récuperer ma clé "token" --> response.data.token)
  //3. j'enferme dans une variable "token" mon response.data.token (DANS LA FONCTION ONCLICK!!!)

  return (
    <div className="login">
      <div className="login-page">
        <div className="form">
          <form
            onSubmit={async event => {
              event.preventDefault();

              if (email === "" || password === "") {
                alert("informations missing");
              } else
                try {
                  const response = await axios.post(
                    "https://leboncoin-api.herokuapp.com/api/user/log_in",
                    {
                      email,
                      password
                    }
                  );
                  console.log(email);
                  console.log(password);

                  if (response.data.token) {
                    // 4. Appeler le serveur pour transmettre un email et un mdp afin d'obtenir un token. Sauvergarder le token et mettre la donnée dans une variable.
                    const token = response.data.token;
                    console.log("token recup" + token);

                    // 5. Remplacer le bouton "Se connecter" du header par "Se déconnecter"
                    Cookies.set("userToken", token, { expires: 2000 });
                    setUser({ userToken: token });
                    // 6. Aller sur la page d'accueil
                    // Link sert à afficher un bouton, nous allons donc utiliser history.push pour changer de page immediatement
                    history.push("/");
                  } else {
                    // Connexion échouée
                    alert("Token is missing");
                  }
                } catch (error) {
                  alert("Identifiants incorrects");
                }
            }}
          >
            <h2>Connexion</h2>
            <hr />
            <div className="login-form">
              <h3>Adresse email</h3>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={event => {
                  setEmail(event.target.value);
                }}
              ></input>
              <h3>Mot de passe</h3>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={event => {
                  setPassword(event.target.value);
                }}
              ></input>

              <button className="form-submit" type="submit">
                Se connecter
              </button>
            </div>
          </form>

          <div className="create-an-account">
            <hr />
            <div>Vous n'avez pas de compte?</div>
            <div className="create-an-account-border">
              <Link to="/sign_up" className="create-an-account-button">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
