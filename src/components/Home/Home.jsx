import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import logo from "../../assets/Logo.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.left}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.right}>
          <h1>
            Онлайн планер <br /> Твій зручний тайм-менеджмент помічник
          </h1>
          <button onClick={() => navigate("/calendar")}>
            Перейти до календаря
          </button>
        </div>
      </main>
    </div>
  );
}
