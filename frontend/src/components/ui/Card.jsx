function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white
        border-4
        border-black
        rounded-2xl
        shadow-[8px_8px_0_black]
        p-6
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-[12px_12px_0_black]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;