export const getPlansFromStorage = () => {
  try {
    const stored = localStorage.getItem("plans");
    return stored ? JSON.parse(stored) : {}; 
  } catch (e) {
    console.warn("Failed to parse plans:", e);
    return {}; 
  }
};

export const savePlansToStorage = (plans) => {
  try {
    localStorage.setItem("plans", JSON.stringify(plans)); 
  } catch (e) {
    console.error("Failed to save plans:", e); 
  }
};
