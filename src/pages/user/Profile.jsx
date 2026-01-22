import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";

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
      const res = await fetch("http://localhost:3000/user/profile", {
        headers: { token },
      });

      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  }

  // ----------------------------
  // FETCH PURCHASED COURSES
  // ----------------------------
  async function fetchPurchasedCourses() {
    try {
      const res = await fetch("http://localhost:3000/user/purchases", {
        headers: { token },
      });

      const data = await res.json();
      setCourses(data.courses || []);
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

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-white">

      <div className="max-w-5xl mx-auto">

        {/* PROFILE CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 
                        rounded-2xl p-8 shadow-xl mb-12">

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

        

      </div>
    </div>
  );
}

export default Profile;
