
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import { studentRoutes } from "routes.js";
import StudentSidebar from "components/Sidebar/StudentSidebar";
import StudentNavbar from "components/Navbars/StudentNavbar";
import StudentFooter from "components/Footers/StudentFooter.js";

import { ToastContainer, toast } from 'react-toastify'

const StudentLayout = (props) => {
  const mainContent = React.useRef(null);
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [role] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") {
      toast.warning("Log in first");
      navigate("/auth/login");
    } else {
      if (role === "admin" || role === "superAdmin") {
        toast.warning("Unauthorized");
        navigate("/admin");
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, []);

  const getRoutes = (studentRoutes) => {
    return studentRoutes.map((prop, key) => {
      if (prop.layout === "/student") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < studentRoutes.length; i++) {
      if (
        props?.location?.pathname.indexOf(studentRoutes[i].layout + studentRoutes[i].path) !==
        -1
      ) {
        return studentRoutes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <StudentSidebar
        {...props}
        routes={studentRoutes}
        logo={{
          innerLink: "/user/index",
          imgSrc: require("../assets/img/brand/JUST_logo.jpg"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <StudentNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(studentRoutes)}
          <Route path="*" element={<Navigate to="/user/index" replace />} />
        </Routes>
        <Container fluid>
          <StudentFooter />
        </Container>
      </div>
    </>
  );
};

export default StudentLayout;
