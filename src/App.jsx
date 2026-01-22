// Importing BrowserRouter, Routes, Route from react-router-dom
// Ye library React me routing (page navigation) handle karti hai.
// BrowserRouter = pura app ko routing ka context deta hai
// Routes = route list ka wrapper
// Route = ek specific page ka path + component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/user/Profile";

// Navbar component har page par show hoga (common top bar)
import Navbar from "./components/Navbar";
import RoleSelection from "./pages/RoleSelection";
import SignupSelection from "./pages/SignupSelection";



import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";

// PUBLIC PAGES
import Home from "./pages/Home";                 // Homepage - all courses listing
import CourseDetails from "./pages/CourseDetails"; // Individual course page

// USER ROUTE PAGES
import UserSignup from "./pages/user/UserSignup";     // User registration page
import UserSignin from "./pages/user/UserSignin";     // User login page
import MyCourses from "./pages/user/MyCourses";       // User's purchased courses page



// ADMIN ROUTE PAGES
import AdminSignup from "./pages/admin/AdminSignup";       // Admin signup page
import AdminSignin from "./pages/admin/AdminSignin";       // Admin signin page
import AdminDashboard from "./pages/admin/AdminDashboard"; // Admin dashboard: list courses
import CreateCourse from "./pages/admin/CreateCourse";     // Admin creates a new course
import EditCourse from "./pages/admin/EditCourse";         // Admin edits an existing course
import { Component } from "react";


// -----------------------------------------------------------
// MAIN COMPONENT : App()
// Ye pura application ka entry point hai.
// Yaha hum routing define karte hain (kaun sa URL, kaunsa component dikhaye)
// -----------------------------------------------------------
function App() {
  return (
    // BrowserRouter ke andar hi sari routing allowed hoti hai
    <BrowserRouter>

      {/* Navbar har page par visible rahega */}
      <Navbar />

      {/* Routes wrapper ke andar saare Route define kiye jaate hain */}
      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}

        <Route path="/login" element={<RoleSelection />} />
        <Route path="/signup" element={<SignupSelection />} />



        {/* Home Page → localhost:5173/ */}
        <Route path="/" element={<Home />} />

        {/* Course Details Page → localhost:5173/course/<id> */}
        {/* :id dynamic parameter hai (backend se courseId fetch karega) */}
        <Route path="/course/:id" element={<CourseDetails />} />


        {/* ---------- USER ROUTES ---------- */}

        {/* User Signup Page → /user/signup */}
        <Route path="/user/signup" element={<UserSignup />} />

        {/* User Signin Page → /user/signin */}
        <Route path="/user/signin" element={<UserSignin />} />
        
        <Route path="/user/profile" element={<Profile />} />

        {/* User Purchased Courses Page → /user/mycourses */}
        {/* ProtectedUserRoute ke through protect bhi kar sakte hai */}
        <Route path="/user/mycourses" element={<MyCourses />} />
        


        {/* ---------- ADMIN ROUTES ---------- */}

        {/* Admin Signup → /admin/signup */}
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* Admin Login → /admin/signin */}
        <Route path="/admin/signin" element={<AdminSignin />} />

        {/* Admin Dashboard → /admin/dashboard */}
        {/* Admin apne created courses dekh sakta hai */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Admin create course → /admin/create */}
        <Route path="/admin/create" element={<CreateCourse />} />

        {/* Admin edit course → /admin/edit/<id> */}
        {/* Dynamic courseId URL me pass hota hai */}
        <Route path="/admin/edit/:id" element={<EditCourse />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
