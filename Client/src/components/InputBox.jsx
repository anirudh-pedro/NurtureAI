import { useState } from 'react';

export default function InputBox({ onSubmit, isLoading }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text.trim());
      // Keep text so user can refine it, or clear it. We'll keep it for a dashboard feel.
    }
  };

  return (
    <div className="bg-white dark:bg-surface-900 rounded-3xl p-3 shadow-sm border border-surface-200 dark:border-surface-800 transition-shadow focus-within:shadow-md focus-within:border-primary-300 dark:focus-within:border-primary-700">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. My baby is 5 months old and I'm running low on diapers"
          className="w-full resize-none bg-transparent border-none p-3 text-surface-900 dark:text-surface-50 placeholder:text-surface-400 focus:outline-none focus:ring-0"
          disabled={isLoading}
        />
        <div className="flex justify-end px-2 pb-1">
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <span>Generate Plan</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
