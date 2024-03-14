
import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import AdminSidebar from "components/Sidebar/AdminSidebar.js";

import { adminRoutes, adminRoutesSidebar } from "routes.js";

import { ToastContainer, toast } from 'react-toastify'

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [role] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();


  useEffect(() => {
    if (token === "") {
      toast.warning("Log in first");
      navigate("/auth/login");
    } else {
      if (role === "superAdmin") {
        toast.warning("Unauthorized");
        navigate("/superAdmin");
      }
      else if (role === "user") {
        toast.warning("Unauthorized");
        navigate("/user");
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, []);

  const getRoutes = (adminRoutes) => {
    return adminRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < adminRoutes.length; i++) {
      if (
        props?.location?.pathname.indexOf(adminRoutes[i].layout + adminRoutes[i].path) !==
        -1
      ) {
        return adminRoutes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <AdminSidebar
        {...props}
        routes={adminRoutesSidebar}
        logo={{
          innerLink: "/admin",
          imgSrc: require("../assets/img/brand/JUST_logo.jpg"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(adminRoutes)}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
