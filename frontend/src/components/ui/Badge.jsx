function Badge({ status }) {
    const styles = {
      PASS: "bg-green-300 text-black",
      FAIL: "bg-red-300 text-black",
      PENDING: "bg-yellow-300 text-black",
    };
  
    return (
      <span
        className={`
          ${styles[status] || "bg-gray-300"}
          inline-flex
          items-center
          justify-center
          px-4
          py-1
          border-2
          border-black
          font-bold
          text-sm
          min-w-[90px]
        `}
      >
        {status}
      </span>
    );
  }
  
  export default Badge;