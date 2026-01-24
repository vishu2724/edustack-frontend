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
        navigate("/admin");
      } else {
        alert(res.data?.message || "Course not created");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create course");
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] p-10 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Create Course
      </h1>

      <div className="bg-[#111827] p-8 rounded-xl max-w-xl">

        <form onSubmit={handleCreate} className="space-y-4">

          <input
            className="w-full p-3 rounded-lg bg-[#0f172a] text-white"
            placeholder="Course Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            rows={4}
            className="w-full p-3 rounded-lg bg-[#0f172a] text-white"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <input
            className="w-full p-3 rounded-lg bg-[#0f172a] text-white"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({ ...form, imageUrl: e.target.value })
            }
            required
          />

          <input
            type="number"
            className="w-full p-3 rounded-lg bg-[#0f172a] text-white"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            Create Course
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
