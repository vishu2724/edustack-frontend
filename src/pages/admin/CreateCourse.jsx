import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  async function handleCreate(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/admin/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Course Created!");
      navigate("/admin/dashboard");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Create Course</h1>

      <form onSubmit={handleCreate} className="space-y-4 max-w-xl">
        <input
          className="w-full p-3 rounded-lg bg-gray-800"
          placeholder="Course Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full p-3 rounded-lg bg-gray-800"
          placeholder="Description"
          rows={4}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          className="w-full p-3 rounded-lg bg-gray-800"
          placeholder="Image URL"
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <input
          className="w-full p-3 rounded-lg bg-gray-800"
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button className="bg-blue-600 px-6 py-3 rounded-lg">
          Create Course
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;

