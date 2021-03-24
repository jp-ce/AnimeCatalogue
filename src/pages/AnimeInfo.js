import React, { useState, useEffect, useCallback } from "react";
import Footer from "../components/Footer";
// import { useGlobalContext } from "../context";
import { Link, useParams } from "react-router-dom";

import Loading from "../components/Loading";

const base_url = "https://api.jikan.moe/v3/anime/";

const AnimeInfo = () => {
  // const { animes } = useGlobalContext();

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [animeShowcase, setAnimeShowcase] = useState(null);

  const fetchAnime = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${base_url}${id}`);
      const data = await response.json();
      // console.log(data);
      if (data) {
        const {
          image_url: image,
          airing,
          duration,
          episodes,
          popularity,
          rank,
          rating,
          genres,
          score,
          synopsis,
          title_english,
          title_japanese,
          url: mal_url,
        } = data;
        // const genreArray = data.genres;
        const newAnime = [
          image,
          title_english,
          title_japanese,
          airing,
          genres,
          synopsis,
          episodes,
          score,
          duration,
          rank,
          rating,
          popularity,
          mal_url,
        ];
        setAnimeShowcase(newAnime);
      } else {
        setAnimeShowcase(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  if (loading) {
    return <Loading />;
  }

  if (!animeShowcase) {
    return <h2 className="section-title">no anime to display</h2>;
  }

  const [
    image,
    title_english,
    title_japanese,
    airing,
    genres,
    synopsis,
    episodes,
    score,
    duration,
    rank,
    rating,
    popularity,
    mal_url,
  ] = animeShowcase;

  // console.log(animeShowcase);

  return (
    <section className=" anime-section">
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
      <h2 className="section-title">
        {title_english ? title_english : title_japanese}
      </h2>
      <div className="anime-details">
        <img src={image} alt={title_english} />
        <div className="anime-details-info">
          <p>
            <span className="anime-details-data">Title :</span>
            {title_english ? title_english : title_japanese}
          </p>
          <p>
            <span className="anime-details-data">Japanese :</span>
            {title_japanese}
          </p>
          <p>
            <span className="anime-details-data">Japanese :</span>
            {genres
              .map((g) => g.name)
              .splice(0, 4)
              .join(", ")}
          </p>
          <p>
            <span className="anime-details-data">score :</span>
            {airing ? score : !airing && episodes === null ? "N/A" : score}
          </p>
          <p>
            <span className="anime-details-data">status :</span>
            {airing
              ? "ongoing"
              : !airing && episodes === null
              ? "Upcoming Anime"
              : "completed"}
          </p>
          {episodes && (
            <p>
              <span className="anime-details-data">episodes :</span>
              {episodes}
            </p>
          )}

          <p>
            <span className="anime-details-data">duration :</span>
            {duration}
          </p>
          <p>
            <span className="anime-details-data">synopsis :</span>
            {synopsis.slice(0, -25)}
          </p>

          <p>
            <span className="anime-details-data">rank :</span>
            {rank === null ? "N/A" : `#${rank}`}
          </p>
          <p>
            <span className="anime-details-data">rating :</span>
            {rating}
          </p>
          <p>
            <span className="anime-details-data">popularity :</span>
            {`#${popularity}`}
          </p>

          <p className="">
            <a href={mal_url} target="_blank" className="btn mal-link">
              visit myanimelist for more
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default AnimeInfo;
