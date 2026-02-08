"use client";
import styles from "../styles/header.module.css";

// cabezera con logo y perfil de usuario
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <img src="/logoSpybee.png" alt="Spybee Logo" className={styles.logoIcon} />
        </div>

        <div className={styles.profile}>
          <div className={styles.avatar}>
            <span>M</span>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Marco</div>
            <div className={styles.userRole}>Administrador</div>
          </div>
          <div className={styles.dropdownIcon}>▼</div>
        </div>
      </div>
    </header>
  );
}
