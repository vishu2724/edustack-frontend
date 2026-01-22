import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import api from "../../api";

/*
  Ye page user ke saare PURCHASED courses show karega.
  Backend route: GET /user/purchases  (JWT required)
*/

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------
  // FETCH USER PURCHASED COURSES
  // ---------------------------------------------------
  async function fetchPurchasedCourses() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/user/purchases");
      setCourses(res.data.courses || []);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching purchases:", err);
      alert(
        err.response?.data?.message || "Unable to fetch purchases"
      );
      setLoading(false);
    }
  }

  // ---------------------------------------------------
  // Page load
  // ---------------------------------------------------
  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  // ---------------------------------------------------
  // LOADING UI
  // ---------------------------------------------------
  if (loading) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        Loading your courses...
      </div>
    );
  }

  // ---------------------------------------------------
  // MAIN UI
  // ---------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10">
      <h1 className="text-4xl font-bold text-white text-center mb-10">
        My Courses
      </h1>

      {courses.length === 0 ? (
        <p className="text-white text-center text-lg">
          You haven't purchased any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((c) => (
            <CourseCard key={c._id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
