import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">

    <Sidebar />
  
    <div className="flex-1 flex flex-col">
  
      <Navbar />
  
      <main className="flex-1 p-8 bg-[#F8F8F8]">
        {children}
      </main>
  
      <footer className="border-t-4 border-black bg-white py-5 text-center text-gray-500 text-sm">
  
        <p className="font-semibold">
          AI Compliance Guardian © 2026
        </p>
  
        <p className="mt-1">
          Built with React • Express • Gemini AI • Casper Network
        </p>
  
      </footer>
  
    </div>
  
  </div>
  );
}

export default Layout;