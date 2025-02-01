import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import styles from "./PageNav.module.css"; // Ensure correct path
import Logo from "./Logo";

const PageNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Logo />

      {/* Hamburger Icon */}
      <div className={styles.hamburgerIcon}>
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>

      {/* Sliding Navigation Menu */}
      <ul className={`${styles.navList} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/pricing" onClick={() => setIsOpen(false)}>
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink to="/product" onClick={() => setIsOpen(false)}>
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={styles.ctaLink}
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
