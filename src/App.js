import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const Pokedex = ({ name, url, type }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const promise = axios(url);

    promise.then((res) => {
      setPokemon(res.data.sprites.front_default);
    });
  });

  return (
    <div
      className={
        type === "electric"
          ? "card electric"
          : type === "steel"
          ? "card steel"
          : type === "water"
          ? "card water"
          : type === "bug"
          ? "card bug"
          : type === "grass"
          ? "card grass"
          : type === "dragon"
          ? "card dragon"
          : type === "fire"
          ? "card fire"
          : type === "ice"
          ? "card ice"
          : type === "normal"
          ? "card normal"
          : type === "flying"
          ? "card flying"
          : type === "rock"
          ? "card rock"
          : type === "psychic"
          ? "card psychic"
          : type === "fairy"
          ? "card fairy"
          : type === "ground"
          ? "card ground"
          : type === "poison"
          ? "card poison"
          : type === "fighting"
          ? "card fighting"
          : type === "dark"
          ? "card dark"
          : type === "ghost"
          ? "card ghost"
          : type === "shadow"
          ? "card shadow"
          : type === "unknow"
          ? "card unknow"
          : "card normal"
      }
    >
      <img className="img-container" src={pokemon} alt={name} />
      <h1
        style={{
          margin: 3,
        }}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <p>
        <strong>Type: {type.charAt(0).toUpperCase() + type.slice(1)}</strong>
      </p>
    </div>
  );
};

const Search = ({ handleSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  let value;
  return (
    <div>
      <input
        value={searchTerm}
        style={{
          width: "20rem",
          backgroundColor: "#f4f9f9",
        }}
        onChange={(e) => {
          value = e.target.value;
          setSearchTerm(value.toLowerCase());
        }}
      />
      <button onClick={() => handleSearchTerm(searchTerm, setSearchTerm)}>
        Search
      </button>
    </div>
  );
};

const Clear = ({ handleClearTerm }) => {
  return (
    <div>
      <button onClick={() => handleClearTerm()}>Clear</button>
    </div>
  );
};

function App() {
  const [pokes, setPokes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      const promise = axios(`https://pokeapi.co/api/v2/type/${query}/`);

      promise.then((res) => {
        setPokes(res.data.pokemon.slice(0, 10));
      });
    }
  }, [query]);

  const handleSearch = (value, setSearchTerm) => {
    setQuery(value);
    setSearchTerm("");
  };

  const handleClear = (value) => {
    setQuery("");
    setPokes([]);
  };

  const arrayPokemon = pokes.map((value) => {
    return (
      <Pokedex
        key={value.pokemon.name}
        name={value.pokemon.name}
        type={query}
        url={value.pokemon.url}
      />
    );
  });

  return (
    <div>
      <h1 className="text-center">
        <strong>POKEDEX</strong>
      </h1>
      <div className="serchBar">
        <Search handleSearchTerm={handleSearch} />
        <Clear handleClearTerm={handleClear} />
      </div>
      {pokes.length > 0 && (
        <>
          <div className="pokegallery">{arrayPokemon}</div>
        </>
      )}
    </div>
  );
}

export default App;
