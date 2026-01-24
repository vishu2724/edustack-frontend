import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api"; // 👈 axios instance

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);

  const token = localStorage.getItem("token");

  // -------------------------------------
  // FETCH COURSE DETAILS
  // -------------------------------------
  async function fetchCourse() {
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data.course);
      setLoading(false);

      if (token) {
        checkIfPurchased();
      }
    } catch (err) {
      console.log("Error fetching course:", err);
      setLoading(false);
    }
  }

  // -------------------------------------
  // CHECK IF USER ALREADY PURCHASED
  // -------------------------------------
  async function checkIfPurchased() {
    try {
      const res = await api.get("/user/purchases");
      const purchased = res.data.courses?.some(
        (c) => c._id === id
      );
      setAlreadyPurchased(purchased);
    } catch (err) {
      console.log("Error checking purchase:", err);
    }
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  // -------------------------------------
  // PURCHASE HANDLER
  // -------------------------------------
  async function handlePurchase() {
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await api.post("/user/purchase", {
        courseId: id,
      });

      alert("Purchase successful!");
      setAlreadyPurchased(true);
    } catch (err) {
      alert(
        err.response?.data?.message || "Purchase failed"
      );
    }
  }

  // -------------------------------------
  // LOADING UI
  // -------------------------------------
  if (loading) {
    return (
      <div className="text-white text-center mt-16 text-xl animate-pulse">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-white text-center mt-16 text-xl">
        Course not found
      </div>
    );
  }

  // -------------------------------------
  // UI
  // -------------------------------------
  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-[350px] object-cover brightness-[0.65]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />

          <div className="absolute bottom-6 left-8">
            <h1 className="text-5xl font-extrabold text-white">
              {course.title}
            </h1>

             <p className="text-gray-200 mt-3 text-lg max-w-2xl">
              {course.description}
            </p> 

            <div className="text-blue-400 font-bold text-3xl mt-4">
              ₹ {course.price}
            </div>

            {alreadyPurchased ? (
              <button
                disabled
                className="mt-6 px-8 py-3 bg-green-600 text-white text-lg
                           font-semibold rounded-xl opacity-70"
              >
                Purchased ✓
              </button>
            ) : (
              <button
                onClick={handlePurchase}
                className="mt-6 px-8 py-3 
                           bg-gradient-to-r from-blue-600 to-blue-500
                           hover:from-blue-500 hover:to-blue-400
                           text-white text-lg font-semibold 
                           rounded-xl shadow-xl transition-all"
              >
                Purchase Now
              </button>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 
                        shadow-xl rounded-2xl p-8 text-gray-200">
          <h2 className="text-3xl font-bold text-white mb-4">
            About this course
          </h2>

          <p className="text-gray-300 text-lg">
            {course.description}
          </p>
        </div>

      </div>
    </div>
  );
}

export default CourseDetails;
