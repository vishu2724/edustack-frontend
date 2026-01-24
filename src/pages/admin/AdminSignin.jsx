import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // 👈 axios instance

function AdminSignin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/admin/signin", {
        ...form,
        email: form.email.toLowerCase(),
      });

      // 🔐 save admin token
      localStorage.setItem("adminToken", res.data.token);

      alert("Admin login successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "Admin login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex justify-center items-center px-6">
      <div className="bg-[#111827] p-8 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignin;
