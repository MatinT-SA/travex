import React, { useEffect, useState } from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(parsedDate);
};

const CityItem = ({ city, isNew }) => {
  if (
    !city ||
    !city.cityName ||
    !city.emoji ||
    !city.date ||
    !city.id ||
    !city.position
  ) {
    return null;
  }

  const { currentCity, deleteCity } = useCities();
  const [animationClass, setAnimationClass] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { cityName, emoji, date, id, position } = city;

  useEffect(() => {
    if (isNew) {
      setAnimationClass(
        id % 2 === 0 ? styles.slideInFromRight : styles.slideInFromLeft
      );
    }
  }, [id, isNew]);

  function handleClick(e) {
    e.preventDefault();
    setShowConfirmation(true);
  }

  function handleConfirmDelete() {
    deleteCity(id);
    toast.success(`${cityName} deleted successfully`, {
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {
        fontSize: "1.5rem",
      },
    });
    setShowConfirmation(false);
  }

  function handleCancelDelete() {
    setShowConfirmation(false);
  }

  return (
    <li className={animationClass}>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>

      {showConfirmation && (
        <div className={styles.confirmationModal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this city?</p>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmDelete}
            >
              Yes, delete
            </button>
            <button
              className={styles.cancelButton}
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default CityItem;
