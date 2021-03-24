import React from "react";
import Bookmark from "./Bookmark";
import Loading from "./Loading";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";
const AnimeList = () => {
  const { bookmarks, loading, setBookmarks } = useGlobalContext();

  const clearBookmarks = () => {
    if (window.confirm("Are you sure you want to delete all bookmarks?")) {
      setBookmarks([]);
    } else {
      return;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (bookmarks.length < 1) {
    return (
      <div className="error-page">
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
        <h1>no bookmarks to show </h1>
      </div>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">My top animes</h2>
      <button className="btn btn-clear-bookmark" onClick={clearBookmarks}>
        Clear all items
      </button>
      <div className="bookmarks-center">
        {bookmarks.map((item) => {
          return <Bookmark key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default AnimeList;
