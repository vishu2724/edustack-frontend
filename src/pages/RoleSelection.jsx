import { useNavigate } from "react-router-dom";
import { UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black
                 flex flex-col items-center px-6 py-20"
    >
      {/* TITLE SECTION */}
      <div className="w-full max-w-5xl mb-20">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
          Choose Role
        </h1>

        <p className="text-gray-400 mt-4 text-2xl">
          Select how you want to login
        </p>
      </div>

      {/* CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full max-w-5xl">

        {/* USER LOGIN CARD */}
        <div
          onClick={() => navigate("/user/signin")}
          className="group cursor-pointer p-10 rounded-3xl backdrop-blur-xl 
                     border border-white/10 bg-white/5 shadow-xl
                     hover:shadow-blue-500/30 hover:border-blue-400/40
                     transition-all hover:-translate-y-2"
        >
          <div className="flex justify-center mb-6">
            <UserIcon className="h-20 w-20 text-blue-400 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-3xl font-semibold text-white">
            User Login
          </h2>

          <p className="text-gray-400 mt-3 text-lg">
            Login as a learner to access courses.
          </p>
        </div>

        {/* ADMIN LOGIN CARD */}
        <div
          onClick={() => navigate("/admin/signin")}
          className="group cursor-pointer p-10 rounded-3xl backdrop-blur-xl 
                     border border-white/10 bg-white/5 shadow-xl
                     hover:shadow-purple-500/30 hover:border-purple-400/40
                     transition-all hover:-translate-y-2"
        >
          <div className="flex justify-center mb-6">
            <ShieldCheckIcon className="h-20 w-20 text-purple-400 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-3xl font-semibold text-white">
            Admin Login
          </h2>

          <p className="text-gray-400 mt-3 text-lg">
            Login to manage & create courses.
          </p>
        </div>

      </div>
    </div>
  );
}

export default RoleSelection;
