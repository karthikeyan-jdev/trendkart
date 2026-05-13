import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductDetails from "../components/ProductDetails";
import Cart from "../pages/Cart";
import Buy from "../pages/Buy";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import Order from "../pages/Order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "details/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "buy",
        element: <Buy />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <Order />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
