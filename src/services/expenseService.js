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

export const addExpense = async (expenses) => {
  const id = Math.random().toString(36).substr(2, 9); // Generate a random ID for the expense
  const createdAt = new Date().toISOString(); // Get the current date and time
  try {
    const response = await fetch(`${BASE_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, createdAt, ...expenses }),
    });
    if (!response.ok) throw Error("Failed add expenses");
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
}

export const updateExpense = async (id, updatedExpense) => {
  try {
    const response = await fetch(`${BASE_URL}/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExpense),
    });

    if (!response.ok) {
      throw new Error("Failed to update expense.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
};

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