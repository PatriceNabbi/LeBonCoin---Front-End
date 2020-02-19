//Voir une annonce
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import "../assets/Style/Offer.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Offer({ user }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const tokenFromCookie = Cookies.get("userToken");
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/" + id
      );
      setData(response.data);
      console.log(response.data.creator.account.username);
      // console.log(response.data);
      setIsLoading(false); // une fois que l'information est récupérée changer le state en false
    };
    fetchData();
  }, []);
  // {
  //   data.offers.map((annunce, index) => {
  //     let totalAnnunce = annunce.creator.account.username + 1;
  //   });
  // }
  return (
    <div>
      {isLoading === true ? (
        <p>En cours de chargement...</p>
      ) : (
        <div className="global-offer-page">
          <div className="offer-page">
            <div className="offer">
              <div className="offer-presentation">
                <div className="offer-picture-wrapper">
                  <img src={data.pictures[0]} alt="annunce picture" />
                </div>
                <div className="offer-title-price-and-desc">
                  <div className="offer-title">{data.title}</div>
                  <div className="offer-price">{data.price} €</div>
                </div>
                <Moment format="DD/MM/YYYY à HH:mm" className="offer-created">
                  {data.created}
                </Moment>
              </div>
              <div className="offer-complete-description">
                <span className="offer-descrip">Description</span>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
          <div className="annuncer">
            <div>{data.creator.account.username}</div>
            <p>17 articles en ligne</p>
            <button
              onClick={() => {
                console.log(tokenFromCookie);
                // Gestion du post d'annonce si l'utilisateur n'a pas de compte ou n'est pas connecté
                // 1. Check si un cookie existe
                if (user === null) {
                  // 3. Aller sur la page d'accueil
                  history.push("/log_in");
                } else
                  history.push(
                    "/payment",
                    { picture: data.picture[0] },
                    { title: data.title },
                    { price: data.price }
                  );
              }}
            >
              <FontAwesomeIcon
                icon={["fas", "shopping-cart"]}
                className="shopping-cart"
              />{" "}
              Acheter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Offer;
