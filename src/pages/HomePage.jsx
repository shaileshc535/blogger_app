import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { CustomRoutes } from "../routes";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dashboard from "./Dashbard";
import Blog from "./Blog";

const HomePage = () => {
  return (
    <HashRouter basename="/">
      <Grid className="container">
        <Grid className="navbar-wrapper">
          <Navbar />
        </Grid>
        <Routes>
          <Route
            exact
            path={CustomRoutes.Dashboard.path}
            element={<Dashboard />}
          />
          <Route exact path={CustomRoutes.Blog.path} element={<Blog />} />
        </Routes>
        <Grid className="footer-wrapper">
          <Footer />
        </Grid>
      </Grid>
    </HashRouter>
  );
};

export default HomePage;
