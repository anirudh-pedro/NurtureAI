export default function Timeline({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-sm border border-surface-200 dark:border-surface-800">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xl">📅</span>
        <h2 className="text-lg font-bold">Action Timeline</h2>
      </div>

      <div className="relative pl-4 sm:pl-6 border-l-2 border-surface-200 dark:border-surface-800 space-y-8">
        {items.map((item, i) => (
          <div key={i} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[21px] sm:-left-[29px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-surface-900 bg-primary-500 shadow-sm" />
            
            <div className="space-y-1.5 -mt-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <h3 className="font-semibold text-surface-900 dark:text-surface-50">{item.event_name}</h3>
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded w-max">
                  {item.date}
                </span>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                {item.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
