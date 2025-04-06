import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/Logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.buttons}>
        <button onClick={() => navigate("/events")}>Події</button>
        <button onClick={() => navigate("/notes")}>Нотатки</button>
      </div>
    </nav>
  );
}
