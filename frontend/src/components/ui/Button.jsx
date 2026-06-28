function Button({
  children,
  onClick,
  variant = "dark",
  className = "",
  ...props
}) {
  const styles = {
    dark: "bg-black text-white hover:bg-white hover:text-black",
    yellow: "bg-yellow-300 hover:bg-yellow-400",
    green: "bg-green-300 hover:bg-green-400",
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-5
        py-3
        border-2
        border-black
        rounded-xl
        font-bold
        transition-all
        duration-200
        hover:scale-105
        active:scale-95
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;