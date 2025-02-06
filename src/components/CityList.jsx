import React, { useEffect, useState } from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

const CityList = () => {
  const { cities, isLoading, dispatch } = useCities();
  const [newCityId, setNewCityId] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const citiesRef = collection(db, "cities");
    const q = query(citiesRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const citiesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Dispatch the cities/loaded action to update the state with the latest cities list
      dispatch({ type: "cities/loaded", payload: citiesList });
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [db, dispatch]);

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
