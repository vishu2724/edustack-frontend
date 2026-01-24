import { Link } from "react-router-dom";

// ----------------------------------------------------------
// PREMIUM CourseCard Component
// ----------------------------------------------------------
function CourseCard({ course }) {
  return (
    <Link to={`/course/${course._id}`}>
      
      {/* Outer animation wrapper */}
      <div className="
        transition-all duration-500 
        hover:-translate-y-2 hover:scale-[1.02]
      ">

        {/* Glass Card Container */}
        <div
          className="
            bg-white/5 backdrop-blur-xl 
            border border-white/10 
            rounded-2xl shadow-xl 
            overflow-hidden cursor-pointer 
            hover:border-blue-500/40 hover:shadow-blue-500/20
            transition-all
          "
        >

          {/* Thumbnail Image */}
          <div className="relative">
            <img
              src={course.imageUrl}
              alt="Course Thumbnail"
              className="h-48 w-full object-cover"
            />

            {/* Top Gradient Overlay for glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>

          {/* Content Body */}
          <div className="p-5 flex flex-col h-[230px]">

            {/* Title */}
            <h2 className="text-2xl font-bold text-white tracking-wide">
              {course.title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 mt-3 text-sm leading-relaxed line-clamp-2">
              {course.description}
            </p>

            {/* Price */}
            <div className="text-blue-400 font-semibold text-xl mt-auto">
  ₹ {course.price}
</div>

          </div>
        </div>

      </div>
    </Link>
  );
}

export default CourseCard;
