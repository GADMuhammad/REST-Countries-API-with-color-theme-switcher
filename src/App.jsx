import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CountryDetailsPage from "./components/CountryDetailsPage";
import Header from "./components/Header";
import Home from "./components/Home";

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
