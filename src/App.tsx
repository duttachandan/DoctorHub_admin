// import "./scss/style.scss";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";

// Coustom Pages
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import store from "./store/Store";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        token
          ? {
              index: true,
              element: <Home />,
            }
          : {
              index: true,
              element: <Login />,
            },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
}

export default App;
