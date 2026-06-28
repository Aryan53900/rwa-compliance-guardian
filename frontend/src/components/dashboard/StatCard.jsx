function StatCard({ title, value, color }) {
    return (
      <div
        className={`${color} border-4 border-black p-5 shadow-[6px_6px_0px_black]`}
      >
        <h3 className="text-sm uppercase font-semibold">
          {title}
        </h3>
  
        <h1 className="text-4xl font-bold mt-3">
          {value}
        </h1>
      </div>
    );
  }
  
  export default StatCard;