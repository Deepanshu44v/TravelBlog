import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/Admin/AdminNavbar";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Blogs from "./pages/Blog";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CreateBlog from "./components/Admin/CreateBlog";
import CreateDestination from "./components/Admin/CreateDestination";
import ManageUsers from "./components/Admin/ManageUsers";
import BlogManagement from "./components/Admin/BlogManagement";
import DestinationManagement from "./components/Admin/DestinationManagement";
import BlogDetail from "./pages/BlogDetail";
import DestinationsDetail from "./pages/DestinationDetail";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import { initGA, logPageView } from "./assets/ga";
import { useLocation } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
// useEffect
// import { Analytics } from '@vercel/analytics';
function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    initGA(); // Initialize GA on first load
  }, []);

  useEffect(() => {
    logPageView(); // Log a pageview on route change
  }, [location]);

  return (
    <>
      {/* Show Admin Navbar if admin is logged in, otherwise show user navbar */}
      {user?.role === "admin" ? <AdminNavbar /> : <Navbar />}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/destinations/:id" element={<DestinationsDetail />} />
        {/* Protected Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-blog"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-destination"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateDestination />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <BlogManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/destinations"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DestinationManagement />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer></Footer>
      {/* <Analytics /> */}
    </>
  );
}

export default App;
