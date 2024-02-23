
import React, { useEffect, useState } from "react";
import { useLocation, Route, Routes, Navigate, useNavigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import { userRoutes } from "routes.js";
import UserSidebar from "components/Sidebar/UserSidebar";
import UserNavbar from "components/Navbars/UserNavbar";
import UserFooter from "components/Footers/UserFooter.js";

import { ToastContainer, toast } from 'react-toastify'

const UserLayout = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") {
      toast.warning("Log in first");
      navigate("/auth/login");
    } else {
      if (role !== "user") {
        toast.warning("Unauthorized");
        navigate("/admin");
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (userRoutes) => {
    return userRoutes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < userRoutes.length; i++) {
      if (
        props?.location?.pathname.indexOf(userRoutes[i].layout + userRoutes[i].path) !==
        -1
      ) {
        return userRoutes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <UserSidebar
        {...props}
        routes={userRoutes}
        logo={{
          innerLink: "/user/index",
          imgSrc: require("../assets/img/brand/favicon.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <UserNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(userRoutes)}
          <Route path="*" element={<Navigate to="/user/index" replace />} />
        </Routes>
        <Container fluid>
          <UserFooter />
        </Container>
      </div>
    </>
  );
};

export default UserLayout;
