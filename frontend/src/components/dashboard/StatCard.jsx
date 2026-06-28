function StatCard({
  title,
  value,
  color,
  icon,
  subtitle,
}) {
  return (
    <div
      className={`
        ${color}
        border-4
        border-black
        rounded-2xl
        p-6
        shadow-[8px_8px_0_black]
        hover:translate-x-1
        hover:translate-y-1
        hover:shadow-[4px_4px_0_black]
        transition-all
        duration-200
      `}
    >
      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm font-semibold uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-5xl font-black mt-3">
            {value}
          </h2>

          {subtitle && (
            <p className="text-sm mt-3 text-gray-700">
              {subtitle}
            </p>
          )}

        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;