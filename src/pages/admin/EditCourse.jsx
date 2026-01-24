import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api"; // axios instance

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const adminToken = localStorage.getItem("adminToken");

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  // -----------------------------------
  // FETCH COURSE DETAILS
  // -----------------------------------
  async function fetchCourse() {
    try {
      const res = await api.get(`/courses/${id}`);
      setForm({
        title: res.data.course.title,
        description: res.data.course.description,
        imageUrl: res.data.course.imageUrl,
        price: res.data.course.price,
      });
    } catch (err) {
      alert("Unable to fetch course");
    }
  }

  // -----------------------------------
  // UPDATE COURSE
  // -----------------------------------
  async function handleUpdate(e) {
    e.preventDefault();

    if (!adminToken) {
      alert("Admin not authenticated");
      return;
    }

    try {
      await api.put(
        "/admin/course",
        {
          ...form,
          courseId: id,
          price: Number(form.price),
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      alert("Course updated!");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] p-10 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Edit Course
      </h1>

      <div className="bg-[#111827] p-8 rounded-xl max-w-xl">

        <form onSubmit={handleUpdate} className="space-y-4">

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
            placeholder="Course Description"
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
            Update Course
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditCourse;
