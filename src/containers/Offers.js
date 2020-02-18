//Liste des annonces (page d'accueil)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import "../assets/Style/Offers.css";
import SearchBar from "../components/SearchBar";
// import Annunces from "../components/Annunces";

function Offers({ search, setSearch }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/with-count"
      );
      setData(response.data);
      setIsLoading(false); // une fois que l'information est récupérée changer le state en false
    };
    fetchData();
  }, []);

  //   console.log(data);

  return (
    <div className="orange-ruban">
      <menu>
        <div className="search-menu">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </menu>
      {isLoading === true ? (
        <p>En cours de chargement...</p>
      ) : (
        <div className="annunces-center">
          {data.offers.map((annunce, index) => {
            return (
              <Link key={annunce._id} to={"/offer/" + annunce._id}>
                <div className="annunces-global">
                  <div className="annunces-organization">
                    <div className="annunces-picture-wrapper">
                      <img src={annunce.pictures[0]} alt="annunces pictures" />
                    </div>

                    <div className="annunces-details">
                      <div className="annunces-first-and-second-line">
                        <div className="annunce-title">{annunce.title}</div>
                        <div className="annunce-price">{annunce.price} €</div>
                      </div>
                      <Moment format="DD/MM/YYYY à HH:mm">
                        {annunce.created}
                      </Moment>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        // {/* //   <span>
        // //     <Link to="/offers/id">blouson pas cher</Link>
        // //   </span> */}
      )}
    </div>
  );
}

export default Offers;
