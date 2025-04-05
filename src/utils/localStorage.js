export const getPlansFromStorage = () => {
  try {
    const stored = localStorage.getItem("plans");
    return stored ? JSON.parse(stored) : {}; // Якщо не знайшли, повертаємо порожній об'єкт
  } catch (e) {
    console.warn("Failed to parse plans:", e);
    return {}; // Якщо сталася помилка при парсингу, теж повертаємо порожній об'єкт
  }
};

export const savePlansToStorage = (plans) => {
  try {
    localStorage.setItem("plans", JSON.stringify(plans)); // Зберігаємо дані в localStorage
  } catch (e) {
    console.error("Failed to save plans:", e); // Якщо сталася помилка, виводимо її в консоль
  }
};
