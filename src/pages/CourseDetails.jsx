import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      const res = await fetch(`http://localhost:3000/courses/${id}`);
      const data = await res.json();

      setCourse(data.course);
      setLoading(false);

      if (token) checkIfPurchased();

    } catch (err) {
      console.log("Error fetching course:", err);
      setLoading(false);
    }
  }

  // -------------------------------------
  // CHECK IF USER ALREADY PURCHASED THIS COURSE
  // -------------------------------------
  async function checkIfPurchased() {
    try {
      const res = await fetch("http://localhost:3000/user/purchases", {
        headers: { token }
      });

      const data = await res.json();

      if (data.courses) {
        const purchased = data.courses.some((c) => c._id === id);
        setAlreadyPurchased(purchased);
      }

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
      const res = await fetch("http://localhost:3000/user/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ courseId: id }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Purchase successful!");
        setAlreadyPurchased(true); // update UI immediately
      } else {
        alert(data.message || "Purchase failed");
      }

    } catch (err) {
      alert("Something went wrong");
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

        {/* HERO SECTION */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">

          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-[350px] object-cover brightness-[0.65]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />

          <div className="absolute bottom-6 left-8">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
              {course.title}
            </h1>

            <p className="text-gray-200 mt-3 text-lg max-w-2xl">
              {course.description}
            </p>

            <div className="text-blue-400 font-bold text-3xl mt-4">
              ₹ {course.price}
            </div>

            {/* ⭐ PURCHASE BUTTON / PURCHASED STATUS */}
            {alreadyPurchased ? (
              <button
                
                className="mt-6 px-8 py-3 bg-green-600 text-gray-300 text-lg
                           font-semibold rounded-xl opacity-70 cursor-not-allowed"
              >
                Purchased ✓
              </button>
            ) : (
              <button
                onClick={handlePurchase}
                className="
                  mt-6 px-8 py-3 
                  bg-gradient-to-r from-blue-600 to-blue-500
                  hover:from-blue-500 hover:to-blue-400
                  text-white text-lg font-semibold 
                  rounded-xl shadow-xl 
                  hover:shadow-blue-500/30 
                  transition-all duration-300
                "
              >
                Purchase Now
              </button>
            )}

          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 
                        shadow-xl rounded-2xl p-8 text-gray-200 leading-relaxed">

          <h2 className="text-3xl font-bold text-white mb-4">About this course</h2>

          <p className="text-gray-300 text-lg">
            {course.description}
          </p>

        </div>

      </div>
    </div>
  );
}

export default CourseDetails;
