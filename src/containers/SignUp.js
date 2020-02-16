import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import "../assets/Style/SignUp.css";
import Bell from "../assets/img/bell.png";
import Clock from "../assets/img/clock.png";
import View from "../assets/img/view.png";

function SignUp() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [user, setUser] = useState("");

  return (
    <div>
      <form
        onSubmit={async event => {
          event.preventDefault();
          // const usernameValidFormat = username.match(/^[a-z0-9_-]{3,15}$/);
          // if (usernameValidFormat === null) {
          //   alert("le username choisi n'est pas valide");
          //   return;
          // }

          // const passwordValidFormat = password1.match(
          //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
          // );
          // console.log(passwordValidFormat);

          // if (passwordValidFormat === null) {
          //   alert(
          //     "le mot de passe doit comporter au moins une majuscule, un chiffre et un caractère spécial"
          //   );
          // }

          // 1. Valider le formulaire
          // Vérifier si les données sont correctes (password1 === password2)
          if (password1 === password2) {
            console.log(true);
            // 2. Appeler le serveur
            try {
              const response = await axios.post(
                "https://leboncoin-api.herokuapp.com/api/user/sign_up",
                {
                  username,
                  email,
                  password: password1
                }
              );

              console.log(username);
              console.log(email);
              console.log(password1);
              if (response.data.token) {
                console.log(response.data.token);
                // si j'obtiens un token alors...
                const token = response.data.token; // (petite transition pour mettre mon response.data.token dans une variable)
                console.log(token);
                Cookies.set("userToken", token, { expire: 2000 }); //...alors j'enregistre le token dans les
                // 2. Remplacer le bouton "Se connecter" du header par "Se déconnecter"
                setUser({ userToken: token });
                // 3. Aller sur la page d'accueil
                // Link sert à afficher un bouton, nous allons donc utiliser history.push pour changer de page immediatement
                history.push("/");
              }
            } catch (error) {
              alert("An error occurred");
              console.log("error.message = ", error);
            }
          }
        }}
      >
        <div>
          <h2>Pourquoi créer un compte?</h2>
          <ul className="why-create-an-account">
            <li>
              <img src={Clock} alt="clock" />
              Gagnez du temps
            </li>
            <p>
              Publiez vos annonces rapidement, avec vos informations
              pré-remplies chaque fois que vous souhaitez déposer une nouvelle
              annonce.
            </p>
            <li>
              <img src={Bell} alt="bell" />
              Soyez les premiers informés
            </li>
            <p>
              Créez des alertes Immo ou Emploi et ne manquez jamais l'annonce
              qui vous intéresse.
            </p>
            <li>
              <img src={View} alt="eye" />
              Visibilité
            </li>
            <p>
              Suivez les statistiques de vos annonces (nombre de fois où votre
              annonce a été vue, nombre de contacts reçus).
            </p>
          </ul>
        </div>
        <h2>Créez un compte</h2>
        <input
          type="texte"
          placeholder=""
          value={username}
          onChange={event => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder=""
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <input
          // type="password"
          placeholder=""
          value={password1}
          onChange={event => {
            setPassword1(event.target.value);
          }}
        />
        <input
          // type="password"
          placeholder=""
          value={password2}
          onChange={event => {
            setPassword2(event.target.value);
          }}
        />

        <input type="submit" value="Créer mon Compte Personnel" />
      </form>
    </div>
  );
}

export default SignUp;
