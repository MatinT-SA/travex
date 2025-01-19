import React from "react";
import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <PageNav />

      <h1>Travex</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
};

export default HomePage;
