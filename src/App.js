import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import "./App.css";

function App() {
  const [offers, setOffers] = useState();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/with-count"
      );
      setOffers(response.data);
      setIsLoading(false); // une fois que l'information est récupérée changer le state en false
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading === true ? (
        <p>En cours de chargement...</p>
      ) : (
        <Router>
          <Switch>
            <Route path="/offers/:id">
              {/* Création de la page d'offres qui sera la page "Offer" --> les pages doivent toujours être organisés avec le sommet le plus micro qui redescend vers le plus macro */}
              <Offer />
            </Route>
            <Route path="/">
              <Offers />
              {/* Création de la page d'accueil qui sera la page "Offers" */}
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
