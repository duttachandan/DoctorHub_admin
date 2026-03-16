import { createBrowserRouter, RouterProvider } from "react-router";

// Coustom Pages
import Layout from "./pages/Layout/ProtectedLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import CreateDoctor from "./pages/CreateDoctor/CreateDoctor";

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
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/createdoctor",
          element: <CreateDoctor />,
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
