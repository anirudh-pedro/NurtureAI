export default function Uncertainty({ message }) {
  if (!message) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-5 border border-amber-200 dark:border-amber-800/50 shadow-sm flex items-start gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">More Information Needed</h3>
        <p className="text-sm text-amber-700 dark:text-amber-400/90 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
