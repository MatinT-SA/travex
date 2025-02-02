import React from "react";
import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorText}>Oops! Page Not Found</h1>
        <p className={styles.message}>Looks like you're lost in space... 🚀</p>
        <img
          src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png"
          alt="404 illustration"
          className={styles.image}
        />
        <a href="/" className={styles.goHome}>
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
