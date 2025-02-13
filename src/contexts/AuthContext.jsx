import { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const USER_TEST = {
  name: "Matin",
  email: "Matin@gmail.com",
  password: "wimbledon",
  avatar: "https://i.pravatar.cc/100?u=ak",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      throw new Error("Invalid action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === USER_TEST.email && password === USER_TEST.password) {
      dispatch({ type: "login", payload: USER_TEST });
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
