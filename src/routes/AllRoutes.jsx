import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"

const AppLayout = lazy(() => import("../layouts/AppLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Expenses = lazy(() => import("../pages/Expenses"));
const Categories = lazy(() => import("../pages/Categories"));
const AddExpenses = lazy(() => import("../pages/AddExpenses"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,

      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "expenses",
          element: <Expenses />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "add-expenses",
          element: <AddExpenses />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ]
    }
  ]
)

