import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const querySnapshot = await getDocs(collection(db, "cities"));
        const citiesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "cities/loaded", payload: citiesList });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "Something went wrong loading the cities",
        });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const docRef = doc(db, "cities", id);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        dispatch({
          type: "city/loaded",
          payload: { id: docSnapshot.id, ...docSnapshot.data() },
        });
      } else {
        dispatch({
          type: "rejected",
          payload: "City not found",
        });
      }
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Something went wrong loading the city",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const cityRef = doc(db, "cities", newCity.cityName);
      await setDoc(cityRef, newCity);
      dispatch({ type: "city/created", payload: newCity });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Something went wrong creating the city",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      const cityRef = doc(db, "cities", id);
      await deleteDoc(cityRef);
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Something went wrong deleting the city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
