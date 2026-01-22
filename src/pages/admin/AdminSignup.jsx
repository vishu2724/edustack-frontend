import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const res = await fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Admin created successfully!");
      navigate("/admin/signin");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Admin Signup
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            placeholder="First Name"
            name="firstName"
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
          />

          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            placeholder="Last Name"
            name="lastName"
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
          />

          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            placeholder="Email"
            name="email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700">
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
