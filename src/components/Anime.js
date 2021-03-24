import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Anime = ({ id, image_url, episodes, score, title, airing, end_date }) => {
  const { addBookmark, animes } = useGlobalContext();

  const handleBookmark = (id) => {
    const animeArray = animes.filter((x) => x.id === id);
    if (animeArray) {
      addBookmark(...animeArray);
    }
  };

  return (
    <article className="anime">
      <button className="btn" onClick={() => handleBookmark(id)}>
        Bookmark me
      </button>
      <div className="img-container">
        <img src={image_url} alt={title} />
      </div>
      <div className="anime-footer">
        <h3>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</h3>
        <h4>
          Episodes:{" "}
          {airing && end_date === null
            ? "Ongoing"
            : !airing && end_date !== null
            ? episodes
            : airing && end_date !== null && episodes
            ? episodes
            : "N/A"}
        </h4>
        <p className={`${score < 6 ? "bad" : score < 8 ? "medium" : "good"}`}>
          Ratings: {score}
        </p>
      </div>
      <Link to={`/anime/${id}`} className="btn btn-primary  btn-details">
        Discover
      </Link>
    </article>
  );
};

export default Anime;
