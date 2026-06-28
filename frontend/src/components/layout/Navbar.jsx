import { useEffect, useState } from "react";
import { Bell, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-24 bg-white border-b-4 border-black px-8 flex items-center justify-between shadow-[0_6px_0_black]">

      {/* Left Section */}

      <div>

        <h1 className="text-3xl font-black">
          AI Compliance Guardian
        </h1>

        <p className="text-gray-600 mt-1">
          Secure • Intelligent • Blockchain Verified
        </p>

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-6">

        {/* System Status */}

        <div className="flex items-center gap-2 bg-green-100 border-2 border-green-500 rounded-full px-4 py-2">

          <ShieldCheck
            size={18}
            className="text-green-600"
          />

          <span className="font-semibold text-green-700">
            System Online
          </span>

        </div>

        {/* Clock */}

        <div className="text-right">

          <p className="font-bold">
            {time}
          </p>

          <p className="text-xs text-gray-500">
            {new Date().toLocaleDateString()}
          </p>

        </div>

        {/* Notification */}

        <button
          className="
          relative
          w-12
          h-12
          border-2
          border-black
          rounded-full
          flex
          items-center
          justify-center
          bg-yellow-300
          hover:scale-110
          hover:rotate-12
          transition-all
          duration-200
          "
        >

          <Bell size={22} />

          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3 border-2 border-black rounded-xl px-4 py-2 bg-[#CFE8D5]">

          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">

            {user?.name?.charAt(0) || "A"}

          </div>

          <div>

            <p className="font-bold">

              {user?.name || "Aryan Suthar"}

            </p>

            <p className="text-sm text-gray-600">

              {user?.email || "admin@guardian.ai"}

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;