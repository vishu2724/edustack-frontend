import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import api from "../../api"; // 👈 axios instance

function Profile() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ----------------------------
  // FETCH USER PROFILE
  // ----------------------------
  async function fetchProfile() {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data.user);
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  }

  // ----------------------------
  // FETCH PURCHASED COURSES
  // ----------------------------
  async function fetchPurchasedCourses() {
    try {
      const res = await api.get("/user/purchases");
      setCourses(res.data.courses || []);
      setLoading(false);
    } catch (err) {
      console.log("Purchases fetch error:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;

    fetchProfile();
    fetchPurchasedCourses();
  }, []);

  // ----------------------------
  // LOADING
  // ----------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-xl">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-xl">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="max-w-5xl mx-auto">

        {/* PROFILE CARD */}
        <div
          className="bg-white/5 backdrop-blur-xl border border-white/10 
                     rounded-2xl p-8 shadow-xl mb-12"
        >
          <h1 className="text-3xl font-bold mb-4">My Profile</h1>

          <p className="text-lg text-gray-300">
            <span className="font-semibold text-white">Name:</span>{" "}
            {user.firstName} {user.lastName}
          </p>

          <p className="text-lg text-gray-300 mt-2">
            <span className="font-semibold text-white">Email:</span>{" "}
            {user.email}
          </p>
        </div>

        {/* PURCHASED COURSES (optional UI if you want later) */}
        {courses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Purchased Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((c) => (
                <CourseCard key={c._id} course={c} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;
