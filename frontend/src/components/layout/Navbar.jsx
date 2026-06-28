function Navbar() {
    return (
      <header className="h-20 border-b-4 border-black bg-white flex items-center justify-between px-8">
        <h2 className="text-3xl font-bold">
          Compliance Dashboard
        </h2>
  
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-black px-4 py-2"
          />
  
          <div className="w-10 h-10 rounded-full bg-yellow-300 border-2 border-black"></div>
        </div>
      </header>
    );
  }
  
  export default Navbar;