import * as ACTIONS from "./actionTypes";

export const initialState = {
  categories: [],
  expenses: [],
  budgets: {
    amount: 0,
  },
  loading: false,
};

export const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ACTIONS.SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ACTIONS.ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "ACTIONS.DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    case "ACTIONS.SET_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
      };
    case "ACTIONS.ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "ACTIONS.UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case "ACTIONS.DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expenses) => expenses.id !== action.payload
        ),
      };
       case "ACTIONS.SET_BUDGETS":
      return {
        ...state,
        budgets: action.payload,
      };
    default:
      return state;
  }
}