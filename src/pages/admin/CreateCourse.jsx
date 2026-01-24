import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // axios instance

function CreateCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  async function handleCreate(e) {
    e.preventDefault();

    try {
      const res = await api.post("/admin/course", {
        ...form,
        price: Number(form.price),
      });

      if (res.data?.success) {
        alert("Course Created!");
        navigate("/admin/dashboard");
      } else {
        alert(res.data?.message || "Course not created");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create course");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Create Course</h1>

      <form onSubmit={handleCreate} className="space-y-4 max-w-xl">
        <input
          className="w-full p-3 rounded-lg bg-gray-800"
          placeholder="Course Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <textarea
          className="w-full p-3 rounded-lg bg-gray-800"
          placeholder="Description"
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <input
          className="w-full p-3 rounded-lg bg-gray-800"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) =>
            setForm({ ...form, imageUrl: e.target.value })
          }
          required
        />

        <input
          type="number"
          className="w-full p-3 rounded-lg bg-gray-800"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
