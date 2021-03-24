import React from "react";
import { useGlobalContext } from "../context";

const SearchBar = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const searchAnime = () => {
    setSearchTerm(searchValue.current.value);
  };

  return (
    <section className=" search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search an anime</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchAnime}
            placeholder="What are you looking for?"
          />
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
