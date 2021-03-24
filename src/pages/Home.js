import React from "react";
import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import Footer from "../components/Footer";
import { useGlobalContext } from "../context";

const Home = () => {
  const { loading } = useGlobalContext();

  return (
    <main>
      <SearchBar />
      <AnimeList />
      {loading || <Footer />}
    </main>
  );
};

export default Home;
