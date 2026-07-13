import * as ACTIONS from "./actionTypes";

export const initialState = {
  categories: [],
  expenses: [],
  budget: {
    amount: 0,
  },
  loading: false,
};

export const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    case "SET_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expenses) => expenses.id !== action.payload
        ),
      };
    default:
      return state;
  }
}