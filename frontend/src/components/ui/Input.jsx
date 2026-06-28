function Input({
    label,
    ...props
  }) {
    return (
      <div className="flex flex-col gap-2">
  
        <label className="font-semibold">
          {label}
        </label>
  
        <input
          {...props}
          className="
          border-2
          border-black
          px-4
          py-3
          bg-white
          focus:outline-none
          focus:ring-4
          focus:ring-yellow-300
          "
        />
  
      </div>
    );
  }
  
  export default Input;