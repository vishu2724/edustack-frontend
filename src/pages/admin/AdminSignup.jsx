import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // 👈 axios instance

function AdminSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  async function handleSignup(e) {
    e.preventDefault();

    try {
      await api.post("/admin/signup", {
        ...form,
        email: form.email.toLowerCase(), // safety
      });

      alert("Admin created successfully!");
      navigate("/admin/signin");
    } catch (err) {
      alert(
        err.response?.data?.message || "Admin signup failed"
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex justify-center items-center px-6">
    <div className="bg-[#111827] p-8 rounded-xl w-full max-w-md shadow-xl">

        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Admin Signup
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
            required
          />

          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
            required
          />

          <input
            type="email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700"
          >
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
