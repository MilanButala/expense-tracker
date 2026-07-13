import { Suspense } from "react";
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AllRoutes"
import Loader from "./ui/Loader";
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  return (
    <ExpenseProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ExpenseProvider>
  )
}

export default App
