import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";

/*
  Ye page user ke saare PURCHASED courses show karega.
  Backend route: GET /user/purchases  (JWT required)
*/

function MyCourses() {
  // purchased courses store karne ke liye
  const [courses, setCourses] = useState([]);

  // loading indicator
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------
  // FETCH USER PURCHASED COURSES
  // ---------------------------------------------------
  async function fetchPurchasedCourses() {
    const token = localStorage.getItem("token"); // JWT token fetch

    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      // backend call
      const res = await fetch("http://localhost:3000/user/purchases", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token, // sending token in headers
        },
      });

      const data = await res.json();

      // if unauthorized
      if (!res.ok) {
        alert(data.message || "Unable to fetch purchases");
        setLoading(false);
        return;
      }

      // response me courses array aayega
      setCourses(data.courses || []);
      setLoading(false);

    } catch (err) {
      console.log("Error fetching purchase:", err);
      alert("Something went wrong");
      setLoading(false);
    }
  }

  // ---------------------------------------------------
  // useEffect → Page load hote hi fetch function chalega
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

      {/* Agar user ne kuch purchase nahi kiya */}
      {courses.length === 0 ? (
        <p className="text-white text-center text-lg">
          You haven't purchased any courses yet.
        </p>
      ) : (
        // Purchased courses grid
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
