import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Bookmark = ({
  id,
  image_url,
  episodes,
  score,
  title,
  airing,
  end_date,
}) => {
  const { removeBookmark, bookmarks } = useGlobalContext();

  const handleBookmark = (identifier) => {
    const newArray = bookmarks.filter((x) => x.id === identifier);
    if (newArray) {
      removeBookmark(...newArray);
    }
  };

  return (
    <article className="bookmarks">
      <button
        className="btn btn-remove-bookmark"
        onClick={() => handleBookmark(id)}
      >
        Remove Bookmark
      </button>
      <div className="img-container">
        <img src={image_url} alt={title} />
      </div>
      <div className="bookmarks-footer">
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
      <Link
        to={`/anime/${id}`}
        className="btn btn-primary btn-details bookmark-detail"
      >
        Discover
      </Link>
    </article>
  );
};

export default Bookmark;
