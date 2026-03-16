import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Login from "../Login/Login";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/Store";

const Layout = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const authToken = useSelector<RootState>((data) => data.auth.data);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [authToken]);
  return (
    <div>
      <Navbar />
      {token ? <Outlet /> : <Login />}
      <Footer />
    </div>
  );
};

export default Layout;

