import React, { useEffect, useState } from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

const CityList = () => {
  const { cities, isLoading } = useCities();
  const [newCityId, setNewCityId] = useState(null);

  useEffect(() => {
    if (cities.length > 0) {
      setNewCityId(cities[cities.length - 1].id);
    }
  }, [cities]);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} isNew={city.id === newCityId} />
      ))}
    </ul>
  );
};

export default CityList;
