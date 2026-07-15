import React, { useEffect, createContext, useContext, useReducer } from 'react'
import { expenseReducer, initialState } from './ExpenseReducer';
import { getCategories, deleteCategory, addCategory as apiAddCategory } from "../services/categoryService";
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/expenseService';
import { getBudget, updateBudget } from '../services/budgetService';

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

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      //console.log(data);
      dispatch({
        type: 'SET_EXPENSES',
        payload: data
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  const addExpenses = async (expenseData) => {
    try {
      const newExpenses = await addExpense(expenseData);

      dispatch({
        type: "ADD_EXPENSE",
        payload: newExpenses,
      });

      return newExpenses;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateExpenses = async (id, expenseData) => {
    try {
      const updatedExpense = await updateExpense(id, expenseData);

      dispatch({
        type: "UPDATE_EXPENSE",
        payload: updatedExpense,
      });

      return updatedExpense;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);
      dispatch({
        type: 'DELETE_EXPENSE',
        payload: id,
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  const loadBudget = async () => {
    try {
      const data = await getBudget();
      //console.log(data);
      dispatch({
        type: 'SET_BUDGETS',
        payload: data
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  const updateBudgetAmount = async (amount) => {
    try {
      const updatedBudget = await updateBudget(amount);
      dispatch({
        type: "SET_BUDGETS",
        payload: updatedBudget,
      });
      return updatedBudget;
    } catch (error) {
      console.error(error);
      return null;
    }
  };


  useEffect(() => {
    loadCategories();
    loadExpenses();
    loadBudget();
  }, []);


  return (
    <ExpenseContext.Provider value={{
      ...state,
      loadCategories,
      addCategory,
      removeCategory,
      loadExpenses,
      addExpenses,
      updateExpenses,
      removeExpense,
      loadBudget,
      updateBudgetAmount,
    }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export function useExpenses() {
  return useContext(ExpenseContext);
}

