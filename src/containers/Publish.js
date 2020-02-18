import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import "../assets/Style/Publish.css";

function Publish() {
  const history = useHistory();
  const userToken = Cookies.get("userToken");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState({});

  const handleSubmit = async event => {
    console.log(1);

    event.preventDefault();
    const formData = new FormData(); //Par convention. Toujours reprendre cette syntaxe
    formData.append("title", title);
    formData.append("text", text);
    formData.append("price", price);
    formData.append("files", file);
    console.log(2);
    try {
      console.log(3);
      console.log(userToken);
      const response = await axios.post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(4);
      //   alert(JSON.stringify(response.data));
      history.push("/offer/" + response.data._id);
      console.log(response.data._id);
    } catch (error) {
      console.log(5);
      if (error.response.status === 500) {
        console.error("An error occured");
      } else {
        console.log(error.response.data);
      }
    }
  };

  //   console.log(user.userToken);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Création d'un formulaire pour déposer une annonce */}
        <h2>Déposer une annonce</h2>
        <hr style={{ width: 450 }} />
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
              setFile(event.target.files[0]);
            }}
          ></input>

          <button type="submit">valider</button>
        </div>
      </form>
    </div>
  );
}

export default Publish;
