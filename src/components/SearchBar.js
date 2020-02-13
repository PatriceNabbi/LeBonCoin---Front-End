import React, { useState } from "react";
import "../assets/Style/SearchBar.css";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search">
      <div
        className="search-zone"
        onSubmit={event => {
          event.prevent.default();
        }}
      >
        <input
          className="search-bar"
          style={{ marginRight: 30 }}
          type="text"
          placeholder="Que recherchez-vous"
          value={search}
          onChange={event => {
            setSearch(event.target.value);
          }}
        ></input>
        <div className="search-validate">
          <button type="submit" className="SarchButton">
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
