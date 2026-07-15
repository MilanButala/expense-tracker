import {BASE_URL} from "./api";

export const getCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories`);

    if (!res.ok) throw Error("Failed getting categories");

    const data = await res.json();
    return data.data || data;
  }
  catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
}

export const addCategory = async (label, swatch) => {
  try {
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, "-"); // due to the new db.json structure, we need to add a slug field
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, slug, label, swatch }),
    });

    if (!response.ok) {
      throw new Error("Failed to add category.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
};

export async function deleteCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete category.");
    }

    return true;
  } catch (error) {
    throw new Error(error.message || "Something went wrong.");
  }
}

