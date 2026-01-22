import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tokenState, setTokenState] = useState(localStorage.getItem("token"));
  const [dropdownOpen, setDropdownOpen] = useState(null); // "user" | "admin" | null

  const adminToken = localStorage.getItem("adminToken");

  const dropdownRef = useRef(null);

  // 🔍 SEARCH STATE
  const [searchText, setSearchText] = useState("");

  // ------------------------------------------
  // FETCH USER DETAILS
  // ------------------------------------------
  async function fetchUser() {
    try {
      if (!tokenState) return;

      const res = await fetch("http://localhost:3000/user/profile", {
        headers: { token: tokenState },
      });

      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch (err) {
      console.log("User fetch error:", err);
    }
  }

  useEffect(() => {
    const updateToken = () => setTokenState(localStorage.getItem("token"));
    window.addEventListener("tokenChanged", updateToken);
    return () => window.removeEventListener("tokenChanged", updateToken);
  }, []);

  useEffect(() => {
    if (tokenState) fetchUser();
    else setUser(null);
  }, [tokenState]);

  // ------------------------------------------
  // OUTSIDE CLICK CLOSE DROPDOWN 🔥
  // ------------------------------------------
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------------------------------
  // LOGOUT
  // ------------------------------------------
  function handleLogout() {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    setDropdownOpen(null);
    setUser(null);
    navigate("/");
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
    <nav className="backdrop-blur-xl bg-gray-900/80 border-b border-white/10 
                    text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r 
                     from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          EduStack

        </Link>

        {/* SEARCH BAR */}
        <div className="hidden md:flex bg-gray-800 px-4 py-2 rounded-xl w-80">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchText}
            onChange={handleSearchInput}
            className="bg-transparent outline-none w-full text-gray-300"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-8">

          <Link to="/" className="hover:text-blue-400">Home</Link>

          {/* ================= ADMIN ================= */}
          {adminToken && !user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  setDropdownOpen(dropdownOpen === "admin" ? null : "admin")
                }
                className="w-11 h-11 rounded-full bg-purple-600 text-white font-bold"
              >
                A
              </button>

              {dropdownOpen === "admin" && (
                <div className="absolute right-0 mt-3 w-48 bg-gray-800 rounded-xl shadow-xl">
                  <p className="px-4 py-3 text-purple-300 font-semibold">
                    Admin Panel
                  </p>

                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setDropdownOpen(null)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      localStorage.removeItem("adminToken");
                      navigate("/");
                      window.location.reload();
                    }}
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
                  setDropdownOpen(dropdownOpen === "user" ? null : "user")
                }
                className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold"
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
                    onClick={handleLogout}
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
              <Link to="/login">Login</Link>
              <Link to="/signup" className="bg-blue-600 px-4 py-2 rounded-lg">
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
