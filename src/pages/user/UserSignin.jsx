import { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  useNavigate() → login successful hone ke baad
  user ko homepage par redirect karta hai
*/

// 🔥 BACKEND BASE URL (ENV se)
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function UserSignin() {
  const navigate = useNavigate();

  // -----------------------------
  // FORM STATE
  // -----------------------------
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // HANDLE INPUT CHANGE
  // -----------------------------
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // -----------------------------
  // HANDLE SIGN IN
  // -----------------------------
  async function handleSignin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        email: form.email.toLowerCase(), // 🔥 important
      };

      const res = await fetch(`${BASE_URL}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        // 🔐 token save
        localStorage.setItem("token", data.token);

        // Navbar update ke liye
        window.dispatchEvent(new Event("tokenChanged"));

        alert("Login successful!");
        navigate("/");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Something went wrong");
    }
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
<div className="min-h-screen bg-[#0b0f19] px-6 py-10 flex justify-center items-center">
<div className="bg-[#111827] p-8 rounded-xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login to Your Account
        </h1>

        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-white transition-all"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSignin;
