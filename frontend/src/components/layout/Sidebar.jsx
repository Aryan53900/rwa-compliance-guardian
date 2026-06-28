import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Blocks,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "New Check",
    path: "/check",
    icon: ShieldCheck,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Blockchain",
    path: "/blockchain",
    icon: Blocks,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-[#CFE8D5] border-r-4 border-black flex flex-col justify-between p-6">

      {/* Logo */}
      <div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            AI Compliance
          </h1>

          <p className="text-sm text-gray-700 mt-2">
            Platform
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 border-2 border-black font-semibold transition ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-white hover:bg-black hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 border-2 border-black font-bold hover:bg-red-600 transition"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;