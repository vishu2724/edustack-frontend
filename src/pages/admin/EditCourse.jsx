import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  async function fetchCourse() {
    const res = await fetch("http://localhost:3000/courses/" + id);
    const data = await res.json();
    setForm({
      title: data.course.title,
      description: data.course.description,
      imageUrl: data.course.imageUrl,
      price: data.course.price,
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/admin/course", {
      method: "PUT",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({
        ...form,
        courseId: id,
        price: Number(form.price),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Course updated!");
      navigate("/admin/dashboard");
    } else {
      alert(data.message);
    }
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>

      <form onSubmit={handleUpdate} className="space-y-4 max-w-xl">
        <input
          className="w-full p-3 rounded-lg bg-gray-800"
          placeholder="Course Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full p-3 rounded-lg bg-gray-800"
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          className="w-full p-3 rounded-lg bg-gray-800"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <input
          className="w-full p-3 rounded-lg bg-gray-800"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button className="bg-blue-600 px-6 py-3 rounded-lg">
          Update Course
        </button>
      </form>
    </div>
  );
}

export default EditCourse;
