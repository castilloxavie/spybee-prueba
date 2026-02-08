"use client";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import styles from "../styles/login.module.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if(success) {
        alert("login exitoso")
    }
    else {
        alert("Usuario o contraseña Incorreta (la contraseña debe tener minimo 6 caracteres)")
    }
    
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginContent}>
          <div className={styles.imageSection}>
            <img src="Spybee.png" alt="Spybee Logo" className={styles.loginImage} />
          </div>
          <div className={styles.formSection}>
            <h2 className={styles.loginTitle}>Login</h2>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <fieldset>
                <legend>Ingresa tus credenciales</legend>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email:</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.formLabel}>Password:</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.formInput}
                  />
                </div>
                <button type="submit" className={styles.loginButton}>Login</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
