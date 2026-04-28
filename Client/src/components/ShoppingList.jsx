export default function ShoppingList({ items }) {
  if (!items || items.length === 0) return null;

  const priorityStyles = {
    High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50",
    Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
  };

  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-sm border border-surface-200 dark:border-surface-800">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🛒</span>
        <h2 className="text-lg font-bold">Shopping List</h2>
        <span className="ml-auto text-xs font-semibold bg-surface-100 dark:bg-surface-800 text-surface-500 px-2.5 py-1 rounded-full">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-surface-100 dark:border-surface-800/50 bg-surface-50/50 dark:bg-surface-800/20 hover:bg-white dark:hover:bg-surface-800 transition-colors">
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-surface-900 dark:text-surface-50">{item.item_name}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${priorityStyles[item.priority] || priorityStyles.Medium}`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400">{item.reason}</p>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="inline-flex flex-col items-start sm:items-end p-2.5 rounded-lg bg-surface-100 dark:bg-surface-800">
                <span className="text-[10px] font-medium text-surface-500 uppercase tracking-widest">Buy In</span>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {item.buy_in_days} {item.buy_in_days === 1 ? 'day' : 'days'}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
