function Button({
    children,
    variant = "dark",
    className = "",
    disabled = false,
    ...props
  }) {
    const styles = {
      dark:
        "bg-black text-white hover:bg-white hover:text-black",
  
      yellow:
        "bg-yellow-300 hover:bg-yellow-400",
  
      white:
        "bg-white hover:bg-gray-100",
    };
  
    return (
      <button
        {...props}
        disabled={disabled}
        className={`
          px-6
          py-3
          border-2
          border-black
          font-semibold
          transition
          ${
            disabled
              ? "opacity-60 cursor-not-allowed"
              : styles[variant]
          }
          ${className}
        `}
      >
        {children}
      </button>
    );
  }
  
  export default Button;