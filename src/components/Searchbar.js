import React, { useState ,useEffect} from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  //const [externalData, setExternalData] = useState([]);



  const searchMovies = async (e) => {
    e.preventDefault();
    const APIKEY= externalData.apikey // or your API Key

    if (query === "") {
      console.log("please enter movie title");
    } else {
      // put your apiKey in here
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${query}&page=1`;
      try {
        const results = await fetch(url);        
        const data = await results.json();
        setMovies(data.results);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="z.B. Fight Club"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </div>
  );
}
