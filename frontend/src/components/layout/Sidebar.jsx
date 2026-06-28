import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Blocks,
  Settings,
  LogOut,
} from "lucide-react";

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
  return (
    <aside className="w-72 min-h-screen bg-[#CFE8D5] border-r-4 border-black flex flex-col justify-between p-6">

      {/* Logo */}
      <div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-2">
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
                  `flex items-center gap-3 px-4 py-3 border-2 border-black font-semibold transition
                  ${
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
      <button className="flex items-center justify-center gap-2 py-3 border-2 border-black bg-red-400 hover:bg-red-500 font-semibold">
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;