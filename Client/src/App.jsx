import { useState } from 'react';
import { analyzeQuery } from './api/analyze';
import InputBox from './components/InputBox';
import ShoppingList from './components/ShoppingList';
import Timeline from './components/Timeline';
import Recommendations from './components/Recommendations';
import Uncertainty from './components/Uncertainty';

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (text) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await analyzeQuery(text);
      setData(response);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Failed to process request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-50 font-sans selection:bg-primary-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200/60 dark:border-surface-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col items-center sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">MomSense AI</h1>
              <p className="text-[11px] font-medium text-surface-500 uppercase tracking-widest">Predictive Care & Shopping</p>
            </div>
          </div>
          <p className="hidden sm:block text-sm text-surface-500 dark:text-surface-400">
            AI that plans your baby's needs before you ask
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Input Section */}
        <section className="mb-12">
          <InputBox onSubmit={handleSubmit} isLoading={isLoading} />
          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-400 text-sm animate-fade-in-up">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}
        </section>

        {/* Output Section */}
        <section className="relative min-h-[400px]">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-50/60 dark:bg-surface-950/60 backdrop-blur-sm rounded-3xl">
              <div className="w-12 h-12 rounded-full border-4 border-surface-200 dark:border-surface-800 border-t-primary-500 animate-spin mb-4" />
              <p className="text-surface-500 font-medium animate-pulse">Analyzing your household needs...</p>
            </div>
          )}

          {!data && !isLoading && !error && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center opacity-60">
              <div className="w-16 h-16 mb-4 text-surface-300 dark:text-surface-700">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <p className="text-surface-500">No data yet. Tell me what's on your mind.</p>
            </div>
          )}

          {data && (
            <div className="space-y-6 animate-fade-in-up">
              {data.uncertainty && <Uncertainty message={data.uncertainty} />}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <ShoppingList items={data.shopping_list} />
                  <Timeline items={data.timeline} />
                </div>
                <div className="lg:col-span-1">
                  <Recommendations items={data.recommendations} />
                </div>
              </div>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
