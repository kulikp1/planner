import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/navLogo.png";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={`${styles.navbar} ${isDarkMode ? styles.dark : ""}`}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.buttons}>
        <button onClick={() => navigate("/")}>На головну</button>
        <button onClick={() => navigate("/events")}>Події</button>
        <button onClick={() => navigate("/notes")}>Нотатки</button>
        <button onClick={toggleTheme}>
          {isDarkMode ? "☀️ Світла тема" : "🌙 Темна тема"}
        </button>
      </div>
    </nav>
  );
}
