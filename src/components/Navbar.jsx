import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../api";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null); // "user" | "admin" | null
  const [searchText, setSearchText] = useState("");

  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");

  const dropdownRef = useRef(null);

  // ------------------------------------------
  // FETCH USER PROFILE
  // ------------------------------------------
  async function fetchUser() {
    if (!userToken) {
      setUser(null);
      return;
    }

    try {
      const res = await api.get("/user/profile");
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.log("User fetch error:", err);
      setUser(null);
    }
  }

  // ------------------------------------------
  // LISTEN TOKEN CHANGES
  // ------------------------------------------
  useEffect(() => {
    fetchUser();

    const handler = () => fetchUser();
    window.addEventListener("tokenChanged", handler);

    return () =>
      window.removeEventListener("tokenChanged", handler);
  }, []);

  // ------------------------------------------
  // OUTSIDE CLICK CLOSE DROPDOWN
  // ------------------------------------------
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------------------------------
  // USER LOGOUT
  // ------------------------------------------
  function handleUserLogout() {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    setUser(null);
    setDropdownOpen(null);
    navigate("/");
  }

  // ------------------------------------------
  // ADMIN LOGOUT
  // ------------------------------------------
  function handleAdminLogout() {
    localStorage.removeItem("adminToken");
    setDropdownOpen(null);
    navigate("/");
    window.location.reload();
  }

  // ------------------------------------------
  // SEARCH HANDLER
  // ------------------------------------------
  function handleSearchInput(e) {
    const value = e.target.value;
    setSearchText(value);
    localStorage.setItem("searchQuery", value);
    window.dispatchEvent(new Event("searchUpdated"));
  }

  return (
<nav className="w-full bg-black-900  text-white px-6 py-4 ">
<div className="max-w-6xl mx-auto flex justify-between items-center">

<Link
  to="/"
  className="text-3xl font-extrabold text-gray-200"
>
  EduStack
</Link>






       {/* SEARCH BAR */}
<div className="hidden md:flex items-center w-80 px-4 py-2 rounded-xl bg-black-800 border border-white/10">
  <svg
    className="w-5 h-5 text-gray-400 mr-3"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
    />
  </svg>

  <input
    type="text"
    placeholder="Search"
    value={searchText}
    onChange={handleSearchInput}
    className="bg-transparent outline-none w-full text-gray-200 placeholder-gray-400"
  />
</div>

        {/* RIGHT */}
        <div className="flex items-center space-x-8">

          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          {/* ================= ADMIN ================= */}
          {adminToken && !user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  setDropdownOpen(
                    dropdownOpen === "admin" ? null : "admin"
                  )
                }
                className="w-11 h-11 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center"
              >
                A
              </button>

              {dropdownOpen === "admin" && (
                <div className="absolute right-0 mt-3 w-48 bg-gray-800 rounded-xl shadow-xl">
                  <p className="px-4 py-3 text-purple-300 font-semibold">
                    Admin Panel
                  </p>

                  <Link
                    to="/admin"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setDropdownOpen(null)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleAdminLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= USER ================= */}
          {user && !adminToken && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  setDropdownOpen(
                    dropdownOpen === "user" ? null : "user"
                  )
                }
                className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center"
              >
                {user.firstName[0].toUpperCase()}
              </button>

              {dropdownOpen === "user" && (
                <div className="absolute right-0 mt-3 w-48 bg-gray-800 rounded-xl shadow-xl">
                  <p className="px-4 py-3 text-blue-300 font-semibold">
                    {user.firstName} {user.lastName}
                  </p>

                  <Link
                    to="/user/mycourses"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setDropdownOpen(null)}
                  >
                    My Courses
                  </Link>

                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setDropdownOpen(null)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleUserLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= GUEST ================= */}
          {!user && !adminToken && (
            <>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
