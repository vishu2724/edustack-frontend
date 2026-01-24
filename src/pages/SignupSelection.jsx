import { useNavigate } from "react-router-dom";
import { UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

function SignupSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center px-6 py-20">

      {/* TITLE SECTION */}
      <div className="w-full max-w-5xl mb-20">
        <h1 className="text-6xl font-extrabold text-white">
          Choose Role
        </h1>

        <p className="text-gray-400 mt-4 text-2xl">
          Select your account
        </p>
      </div>

      {/* CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full max-w-5xl">

        {/* USER SIGNUP CARD */}
        <div
          onClick={() => navigate("/user/signup")}
          className="
            group cursor-pointer p-10 rounded-3xl
            bg-[#111827] border border-white/10
            transition-all hover:-translate-y-2
            hover:border-blue-500/40 hover:shadow-[0_0_40px_6px_rgba(59,130,246,0.25)]
          "
        >
          <div className="flex justify-center mb-6">
            <UserIcon className="h-20 w-20 text-blue-400 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-3xl font-semibold text-white">
            User Signup
          </h2>

          <p className="text-gray-400 mt-3 text-lg">
            Join as a learner & access courses.
          </p>
        </div>

        {/* ADMIN SIGNUP CARD */}
        <div
          onClick={() => navigate("/admin/signup")}
          className="
            group cursor-pointer p-10 rounded-3xl
            bg-[#111827] border border-white/10
            transition-all hover:-translate-y-2
            hover:border-purple-500/40 hover:shadow-[0_0_40px_6px_rgba(168,85,247,0.25)]
          "
        >
          <div className="flex justify-center mb-6">
            <ShieldCheckIcon className="h-20 w-20 text-purple-400 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-3xl font-semibold text-white">
            Admin Signup
          </h2>

          <p className="text-gray-400 mt-3 text-lg">
            Create & manage courses from the dashboard.
          </p>
        </div>

      </div>
    </div>
  );
}

export default SignupSelection;
