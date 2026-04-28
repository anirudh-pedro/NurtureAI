export default function Recommendations({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-sm border border-surface-200 dark:border-surface-800">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">💡</span>
        <h2 className="text-lg font-bold">Recommendations</h2>
      </div>

      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="space-y-3 pb-6 border-b border-surface-100 dark:border-surface-800 last:pb-0 last:border-0">
            
            <p className="font-semibold text-surface-900 dark:text-surface-50 text-sm leading-relaxed">
              {item.suggestion}
            </p>

            <div className="p-3 bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-100 dark:border-surface-800/80">
              <p className="text-xs text-surface-600 dark:text-surface-400 italic">
                "{item.reasoning}"
              </p>
            </div>

            <div className="pt-1">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-surface-500 mb-1.5">
                <span>AI Confidence</span>
                <span className="text-primary-600 dark:text-primary-400">{item.confidence}%</span>
              </div>
              <div className="w-full bg-surface-200 dark:bg-surface-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-primary-500 h-1.5 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${item.confidence}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
