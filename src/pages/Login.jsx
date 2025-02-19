import { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";

import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("Matin@gmail.com");
  const [password, setPassword] = useState("wimbledon");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      const success = login(email, password);

      if (success) {
        toast.success("Successful Login", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Zoom,
          style: {
            fontSize: "1.8rem",
          },
        });
      } else {
        toast.error("Invalid email or password", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Zoom,
          style: {
            fontSize: "1.8rem",
          },
        });
      }
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
