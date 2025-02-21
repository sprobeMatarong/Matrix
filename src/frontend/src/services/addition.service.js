import api from "utils/api";

const addingNum = async (props) => {
  try {
    const response = await api.post("/sum", props); // Ensure correct API route
    return response.data; // Return only the data part
  } catch (error) {
    console.error("Error adding numbers:", error);
    throw error; // Propagate the error for higher-level handling
  }
};

export { addingNum };
