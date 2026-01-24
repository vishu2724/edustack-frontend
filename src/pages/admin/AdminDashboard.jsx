import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api"; // axios instance

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const adminToken = localStorage.getItem("adminToken");

  // ------------------------------------
  // FETCH COURSES
  // ------------------------------------
  async function fetchCourses() {
    if (!adminToken) {
      alert("Admin not authenticated");
      navigate("/admin/signin");
      return;
    }

    try {
      const res = await api.get("/admin/course/bulk", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setCourses(res.data.courses || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch courses");
    }
  }

  // ------------------------------------
  // DELETE COURSE
  // ------------------------------------
  async function deleteCourse(id) {
    const ask = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!ask) return;

    try {
      await api.delete(`/admin/course/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      alert("Course deleted successfully!");

      setCourses((prev) =>
        prev.filter((course) => course._id !== id)
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete course");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] p-10 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <Link
          to="/admin/create"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
        >
          + Create Course
        </Link>
      </div>

      {/* EMPTY STATE */}
      {courses.length === 0 ? (
        <p className="text-gray-400">
          No courses created yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {courses.map((c) => (
            <div
              key={c._id}
              className="bg-[#111827] p-5 rounded-xl shadow-xl border border-white/5"
            >
              <img
                src={c.imageUrl}
                alt={c.title}
                className="h-48 w-full object-cover rounded-lg"
              />

              <h2 className="text-xl mt-4 font-bold text-white">
                {c.title}
              </h2>

              <p className="text-gray-400 mt-2">
                {c.description}
              </p>

              <div className="flex gap-4 mt-4">
                <Link
                  to={`/admin/edit/${c._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-medium text-black"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteCourse(c._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
