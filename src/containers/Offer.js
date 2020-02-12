//Voir une annonce
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// axios.get("https://leboncoin-api.herokuapp.com/api/offer/with-count" + { id });

function Offer(props) {
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/:id"
      );
      setOffer(response.data);
      setIsLoading(false); // une fois que l'information est récupérée changer le state en false
    };
    fetchData();
  }, []);

  const { id } = useParams();

  return <div>Je suis le produit!\{id}</div>;
}

export default Offer;
