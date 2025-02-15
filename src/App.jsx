import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import CountryDetailsPage from "./components/CountryDetailsPage";
import Header from "./components/Header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/:country",
          element: <CountryDetailsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
