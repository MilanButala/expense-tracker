import React, {useEffect, createContext, useContext, useReducer } from 'react'
import { expenseReducer, initialState } from './ExpenseReducer';
import { getCategories, deleteCategory, addCategory as apiAddCategory } from "../services/categoryService";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(
    expenseReducer,
    initialState
  );

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      dispatch({
        type: "SET_CATEGORIES",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addCategory = async (label, swatch) => {
    try {
      const newCategory = await apiAddCategory(label, swatch);

      dispatch({
        type: "ADD_CATEGORY",
        payload: newCategory,
      });

      return newCategory;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const removeCategory = async (id) => {
    try {
      await deleteCategory(id);

      dispatch({
        type: "DELETE_CATEGORY",
        payload: id,
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);


  return (
    <ExpenseContext.Provider value={{ ...state, loadCategories, addCategory, removeCategory }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export function useExpenses() {
  return useContext(ExpenseContext);
}

