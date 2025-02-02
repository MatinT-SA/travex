import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

const PageNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Logo />

      <div className={styles.hamburgerIcon}>
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>

      <ul className={`${styles.navList} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={styles.navLink}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className={styles.navLink}
          >
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/product"
            onClick={() => setIsOpen(false)}
            className={styles.navLink}
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={`${styles.ctaLink} ${styles.navLink}`}
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
