import { TopNav } from "./topNav";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";
import {  Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const MainLayout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="wrapper" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div className="main">
          <TopNav />
          <main className="content">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
