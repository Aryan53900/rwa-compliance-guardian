function Card({ children, className = "" }) {
    return (
      <div
        className={`
          bg-white
          border-4
          border-black
          shadow-[8px_8px_0px_black]
          p-6
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
  
  export default Card;