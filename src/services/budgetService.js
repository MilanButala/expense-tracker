import BASE_URL from "./api";

export const getBudget = async () => {
  try {
    const res = await fetch(`${BASE_URL}/budget`);

    if (!res.ok) throw Error("Failed getting budget");

    const data = await res.json();
    return data.data || data;
  }
  catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
}

export const updateBudget = async (amount) => {
  try {
    const response = await fetch(`${BASE_URL}/budget`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error("Failed to update budget.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
};