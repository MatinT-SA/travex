import React from "react";
import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities" exact>
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink to="countries" exact>
            Countries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
