import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Dairy } from "./pages/Dairy/Dairy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Not Found Page 404</div>,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "diary",
        element: <Dairy />,
      },
    ],
  },
]);
