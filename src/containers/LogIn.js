import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function Login({ setUser, user, name, setName, email, setEmail, password1, setPassword1, password2, setPassword2 }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  //1. Récupérer le token via une requête axios.post (on utilise post car c'est la soumission d'une information via le log in)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "https://leboncoin-api.herokuapp.com/api/user/log_in",
        {
          email: "farid@lereacteur.io",
          password: "azerty"
        }
      );
      setData(response.data);
      console.log(response.data);
      setIsLoading(false); // une fois que l'information est récupérée changer le state en false
    };
    fetchData();
  }, []);

  //2. response.data est un objet (cf le console.log() donc je peux aller récuperer ma clé "token" --> data.token)
  //3. j'enferme dans une variable "token" mon data.token (DANS LA FONCTION ONCLICK!!!)

  return (
    <span>
      <div>
          <h2>Connexion</h2>
          <hr/>
          <input
          type="text"
          placeholder=""
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder=""
          value={password1}
          onChange={event => {
            setPassword1(event.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder=""
          value={password2}
          onChange={event => {
            setPassword2(event.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            // 4. Sauvegarder le token dans les cookies
            const token = data.token;
            // 5. Remplacer le bouton "Se connecter" du header par "Se déconnecter"
            Cookies.set("userToken", token, { expires: 2000 });
            setUser({ usertoken: token });
            // 6. Aller sur la page d'accueil
            // Link sert à afficher un bouton, nous allons donc utiliser history.push pour changer de page immediatement
            history.push("/");
          }}
        >
          Se connecter
        </button>
      </div>
    </span>
  );
}

export default Login;
