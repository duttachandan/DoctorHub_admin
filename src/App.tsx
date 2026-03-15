// import "./scss/style.scss";
import { createBrowserRouter, RouterProvider } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Coustom Pages
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
// import { type RootState } from "./store/Store";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
