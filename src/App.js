import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import pages
import Home from "./pages/Home";
import Error from "./pages/Error";
import AnimeInfo from "./pages/AnimeInfo";
import Bookmarks from "./pages/Bookmarks";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/bookmarks">
          <Bookmarks />
        </Route>
        <Route exact path="/anime/:id">
          <AnimeInfo />
        </Route>
        <Route exact path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
