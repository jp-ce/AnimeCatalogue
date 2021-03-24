import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  useCallback,
} from "react";

const getLocalStorage = () => {
  let bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) {
    return (bookmarks = JSON.parse(localStorage.getItem("bookmarks")));
  } else {
    return [];
  }
};

const AppContext = createContext();
const base_url = "https://api.jikan.moe/v3/search/anime?q=";

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("one piece");
  const [animes, setAnimes] = useState([]);
  const [bookmarks, setBookmarks] = useState(getLocalStorage());

  const addBookmark = (payload) => {
    let oldBookmarks = bookmarks;
    let newBookmarks = [...new Set([...oldBookmarks, payload])];
    setBookmarks(newBookmarks);
  };

  const removeBookmark = (payload) => {
    let oldBookmarks = bookmarks;
    let newBookmarks = oldBookmarks.filter((x) => x !== payload);
    setBookmarks(newBookmarks);
  };

  const fetchAnimes = useCallback(async () => {
    if (searchTerm.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(`${base_url}${searchTerm}&limit=16`);
        const data = await response.json();
        const { results } = data;
        // console.log(data);

        if (data) {
          const newAnime = results.map((item) => {
            const {
              mal_id,
              end_date,
              airing,
              episodes,
              image_url,
              score,
              synopsis,
              title,
              url,
              members,
              rated,
              type,
            } = item;
            return {
              id: mal_id,
              end_date,
              airing,
              episodes,
              image_url,
              score,
              synopsis,
              title,
              mal_url: url,
              members,
              rated,
              type,
            };
          });
          setAnimes(newAnime);
        } else {
          setAnimes([]);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    const timerID = setTimeout(() => {
      fetchAnimes();
    }, 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, [searchTerm, fetchAnimes]);

  // useEffect(() => {
  //   localStorage.setItem('list', JSON.stringify(list));
  // }, [list]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        animes,
        setSearchTerm,
        bookmarks,
        setBookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//create a global custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
