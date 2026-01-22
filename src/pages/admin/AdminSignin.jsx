import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSignin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/admin/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        alert("Admin login successful!");
        navigate("/admin/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      setLoading(false);
      alert("Server error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            onChange={handleChange}
          />

          <button
            className="w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignin;
