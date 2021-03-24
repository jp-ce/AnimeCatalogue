import React from "react";
import Anime from "./Anime";
import Loading from "./Loading";
import { useGlobalContext } from "../context";
const AnimeList = () => {
  const { animes, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  if (animes.length < 1) {
    return <h2 className="section title">no animes matched</h2>;
  }

  return (
    <section className="">
      {/* <h2 className="section-title"></h2> */}
      <div className="animes-center">
        {animes.map((item) => {
          return <Anime key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default AnimeList;
