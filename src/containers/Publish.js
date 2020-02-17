import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "../assets/Style/Publish.css";

function Publish({
  title,
  setTitle,
  text,
  setText,
  price,
  setPrice,
  file,
  setFile
}) {
  const userToken = Cookies.get("userToken");

  return (
    <div>
      <form
        onSubmit={async event => {
          //Création d'un formulaire pour déposer une annonce
          event.preventDefault();
          const formData = new FormData(); //Par convention. Toujours reprendre cette syntaxe
          formData.append("Title", title);
          formData.append("Text", text);
          formData.append("Price", price);
          formData.append("Files", file);

          try {
            const response = await axios.post(
              "https://leboncoin-api.herokuapp.com/api/offer/publish",
              formData,
              {
                headers: {
                  Authorization: "Bearer" + userToken,
                  "Content-Type": "multipart/form-data"
                }
              }
            );
            alert(JSON.stringify(response.data));
          } catch (error) {
            if (error.response.status === 500) {
              console.error("An error occured");
            } else {
              console.log(error.response.data);
            }
          }
        }}
      >
        <h2>Déposer une annonce</h2>
        <hr />
        <div className="post-an-annunce">
          <h3>Titre de l'annonce*</h3>
          <input
            type="text"
            onChange={event => {
              setTitle(event.target.value);
            }}
          ></input>
          <h3>Texte de l'annonce*</h3>
          <input
            type="text"
            onChange={event => {
              setText(event.target.value);
            }}
          ></input>
          <h3>Prix*</h3>
          <div>
            <input
              type="number"
              onChange={event => {
                setPrice(event.target.value);
              }}
            ></input>
            {""}
            <span> € </span>
          </div>

          <br />
          <h3>Photo*</h3>
          <input
            type="file"
            onChange={event => {
              setFile(event.target.value);
            }}
          ></input>

          <button type="submit">
            <Link to="/">Valider</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Publish;
