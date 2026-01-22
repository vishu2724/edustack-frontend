import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  async function fetchCourses() {
    const res = await fetch("http://localhost:3000/admin/course/bulk", {
      headers: { token },
    });

    const data = await res.json();
    setCourses(data.courses);
  }

  // ---------------------------------------------------
  // DELETE COURSE FUNCTIONALITY
  // ---------------------------------------------------
  async function deleteCourse(id) {
    const ask = window.confirm("Are you sure you want to delete this course?");
    if (!ask) return;

    try {
      const res = await fetch(`http://localhost:3000/admin/course/${id}`, {
        method: "DELETE",
        headers: { token },
      });

      const data = await res.json();

      if (data.success) {
        alert("Course deleted successfully!");

        // Remove deleted course from UI
        setCourses((prev) => prev.filter((course) => course._id !== id));
      } else {
        alert(data.message || "Failed to delete course");
      }
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          to="/admin/create"
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Course
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((c) => (
          <div key={c._id} className="bg-gray-800 p-5 rounded-lg shadow-xl">
            <img
              src={c.imageUrl}
              className="h-48 w-full object-cover rounded-lg"
            />
            <h2 className="text-xl mt-4 font-bold">{c.title}</h2>
            <p className="text-gray-300 mt-2">{c.description}</p>

            <div className="flex gap-4 mt-4">
              <Link
                to={`/admin/edit/${c._id}`}
                className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteCourse(c._id)}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
