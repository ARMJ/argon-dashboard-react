
import AdminDashboard from "views/admin/Dashboard.js";
import AdminProfile from "views/superAdmin/Profile.js";
import Admins from "views/superAdmin/Admins.js";
import AddAdmin from "views/superAdmin/AddAdmin.js";
import AllStudents from "views/admin/Students.js";
import StudentDetails from "views/admin/StudentDetails.js";
import StudentAddInfo from "views/admin/StudentAddInfo.js";
import UpdateInfo from "views/student/UpdateInfo.js";
import StudentProfile from "views/student/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/auth/Register.js";
import StudentLogin from "views/auth/Login.js";
import AdminLogin from "views/auth/Admin.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var studentRoutes = [
  {
    path: "/",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <StudentProfile />,
    layout: "/student",
  },
  {
    path: "/update-info",
    name: "Update Information",
    icon: "ni ni-tv-2 text-primary",
    component: <UpdateInfo />,
    layout: "/student",
  },
];

var adminRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <AdminDashboard />,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "All students",
    icon: "ni ni-hat-3 text-primary",
    component: <AllStudents />,
    layout: "/admin",
  },
  {
    path: "/studentDetails/:id",
    name: "Student Details",
    icon: "ni ni-hat-3 text-primary",
    component: <StudentDetails />,
    layout: "/admin",
  },
  {
    path: "/studentAddInfo/:id",
    name: "Add student info",
    icon: "ni ni-hat-3 text-primary",
    component: <StudentAddInfo />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },

  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
];

var adminRoutesSidebar = [

  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <AdminDashboard />,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "All students",
    icon: "ni ni-hat-3 text-primary",
    component: <AllStudents />,
    layout: "/admin",
  },

];

var superAdminRoutes = [

  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <AdminDashboard />,
    layout: "/superAdmin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-primary",
    component: <AdminProfile />,
    layout: "/superAdmin",
  },
  {
    path: "/admins",
    name: "All Admins",
    icon: "ni ni-circle-08 text-primary",
    component: <Admins />,
    layout: "/superAdmin",
  },
  {
    path: "/addAdmin",
    name: "Add Admins",
    icon: "ni ni-circle-08 text-primary",
    component: <AddAdmin />,
    layout: "/superAdmin",
  },
  {
    path: "/students",
    name: "All students",
    icon: "ni ni-hat-3 text-primary",
    component: <AllStudents />,
    layout: "/superAdmin",
  },
  {
    path: "/studentDetails/:id",
    name: "Student Details",
    icon: "ni ni-hat-3 text-primary",
    component: <StudentDetails />,
    layout: "/superAdmin",
  },
  {
    path: "/studentAddInfo/:id",
    name: "Add student info",
    icon: "ni ni-hat-3 text-primary",
    component: <StudentAddInfo />,
    layout: "/superAdmin",
  },

];

var superAdminRoutesSidebar = [

  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <AdminDashboard />,
    layout: "/superAdmin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-primary",
    component: <AdminProfile />,
    layout: "/superAdmin",
  },
  {
    path: "/admins",
    name: "All Admins",
    icon: "ni ni-circle-08 text-primary",
    component: <Admins />,
    layout: "/superAdmin",
  },
  {
    path: "/students",
    name: "All students",
    icon: "ni ni-hat-3 text-primary",
    component: <AllStudents />,
    layout: "/superAdmin",
  },

];

var authRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <StudentLogin />,
    layout: "/auth",
  },
  {
    path: "/admin",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <AdminLogin />,
    layout: "/auth",
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // }
];
export { adminRoutes, adminRoutesSidebar, superAdminRoutesSidebar, superAdminRoutes, studentRoutes, authRoutes };
