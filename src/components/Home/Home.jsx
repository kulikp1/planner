import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import logo from "../../assets/Logo.png";
import { useTheme } from "../../context/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.left}>
          <img
            src={logo}
            alt="Logo"
            className={`${styles.logo} ${!isDarkMode ? styles.lightLogo : {}}`}
          />
        </div>
        <div className={`${styles.right} ${!isDarkMode ? styles.light : {}}`}>
          <h1>
            Онлайн планер <br /> Твій зручний тайм-менеджмент помічник
          </h1>
          <button
            className={`${styles.rightButton} ${
              !isDarkMode ? styles.light : {}
            }`}
            onClick={() => navigate("/calendar")}
          >
            Перейти до календаря
          </button>
        </div>
      </main>
    </div>
  );
}
