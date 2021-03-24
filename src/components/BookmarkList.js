import React from "react";
import Bookmark from "./Bookmark";
import Loading from "./Loading";
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
    return <h2 className="section title">no bookmarks to show</h2>;
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
