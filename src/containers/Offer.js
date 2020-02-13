//Voir une annonce
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import "../assets/Style/Offer.css";

// axios.get("https://leboncoin-api.herokuapp.com/api/offer/with-count" + { id });

function Offer() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/" + id
      );
      setData(response.data);
      console.log(response.data);
      setIsLoading(false); // une fois que l'information est récupérée changer le state en false
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading === true ? (
        <p>En cours de chargement...</p>
      ) : (
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
              <p className="offer-description">{data.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Offer;
