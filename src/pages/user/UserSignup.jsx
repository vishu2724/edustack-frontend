import { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  Signup successful hone ke baad
  user ko signin page par redirect karta hai
*/

// 🔥 BACKEND BASE URL (ENV se)
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function UserSignup() {
  const navigate = useNavigate();

  // -----------------------------
  // FORM STATE
  // -----------------------------
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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
  // HANDLE SIGNUP
  // -----------------------------
  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    // 🔐 Basic validation (frontend safety)
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // 🔥 Email lowercase (duplicate issue avoid)
      const payload = {
        ...form,
        email: form.email.toLowerCase(),
      };

      const res = await fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert(data.message || "Signup successful! Please login now.");
        navigate("/user/signin");
      } else {
        alert(data.message || "Signup failed");
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
    <div className="min-h-screen bg-gray-900 px-6 py-10 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create Your Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            value={form.lastName}
            onChange={handleChange}
            required
          />

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
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSignup;
