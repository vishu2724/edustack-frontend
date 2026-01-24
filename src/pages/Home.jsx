import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import api from "../api";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );

  // --------------------------------------------------------
  // FETCH COURSES
  // --------------------------------------------------------
  async function fetchCourses() {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.courses || []);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching courses:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  // --------------------------------------------------------
  // LISTEN SEARCH UPDATES
  // --------------------------------------------------------
  useEffect(() => {
    const handler = () => {
      const text = localStorage.getItem("searchQuery") || "";
      setSearchQuery(text);
    };

    window.addEventListener("searchUpdated", handler);
    return () => window.removeEventListener("searchUpdated", handler);
  }, []);

  // --------------------------------------------------------
  // FILTER
  // --------------------------------------------------------
  const filteredCourses = courses.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query)
    );
  });

  // --------------------------------------------------------
  // LOADING
  // --------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex justify-center items-center">
        <p className="text-white text-2xl animate-pulse">
          Loading courses...
        </p>
      </div>
    );
  }

  // --------------------------------------------------------
  // MAIN UI
  // --------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0b0f19] px-6 py-16">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-extrabold text-white">
          Explore Courses
        </h1>

        <p className="text-gray-400 mt-4 text-xl">
          Learn from premium, curated learning paths.
        </p>

        {searchQuery && (
          <p className="text-blue-400 mt-3 text-lg">
            Showing results for:{" "}
            <span className="font-semibold">"{searchQuery}"</span>
          </p>
        )}
      </div>

      {/* COURSES */}
      {filteredCourses.length === 0 ? (
        <p className="text-white text-center text-xl">
          No courses match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredCourses.map((c) => (
            <div
              key={c._id}
              className="transition-transform duration-300 hover:-translate-y-2"
            >
              <CourseCard course={c} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
