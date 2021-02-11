import "./App.css";
import React, { useEffect, useState } from "react";
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
  const [filterTerm, setFilterTerm] = useState(10);
  return (
    <div>
      <label>Number of pokemons </label>

      <select
        value={filterTerm}
        className="form-control"
        id="total-questions"
        onChange={(e) => {
          const value = e.target.value;
          setFilterTerm(value);
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      <input
        value={searchTerm}
        style={{
          width: "20rem",
          backgroundColor: "#f4f9f9",
        }}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value.toLowerCase());
        }}
      />
      <button
        onClick={() =>
          handleSearchTerm(searchTerm, setSearchTerm, filterTerm, setFilterTerm)
        }
      >
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
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (query) {
      const promise = axios(`https://pokeapi.co/api/v2/type/${query}/`);

      promise.then((res) => {
        setPokes(res.data.pokemon.slice(0, amount));
      });
    }
  }, [query]);

  const handleSearch = (value, setSearchTerm, value2, setFilterTerm) => {
    setQuery(value);
    setSearchTerm("");
    setAmount(value2);
    setFilterTerm(10);
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
