import BASE_URL from "./api";

export const getExpenses = async () => {
  try {
    const res = await fetch(`${BASE_URL}/expenses`);

    if (!res.ok) throw Error("Failed getting expenses");

    const data = await res.json();
    return data.data || data;
  }
  catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
}

export const deleteExpense = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, {
      method: "DELETE",
    });
    
    if (!res.ok) {
      throw new Error("Failed to delete expenses.");
    }

    return true;
  }
  catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
}