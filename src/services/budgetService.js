import { BUDGET_URL } from "./api";
const BUDGET_ID = 1; // Assuming there's only one budget entry with ID 1 for Using MockAPI

export const getBudget = async () => {
  try {
    const res = await fetch(`${BUDGET_URL}/budget/${BUDGET_ID}`);

    if (!res.ok) throw Error("Failed getting budget");

    const data = await res.json();
    console.log("Budget data:", data); // Log the budget data for debugging
    return data.data || data;
  }
  catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
}

export const updateBudget = async (amount) => {
  try {
    const response = await fetch(`${BUDGET_URL}/budget/${BUDGET_ID}`, {
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