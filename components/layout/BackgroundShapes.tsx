/**
 * Animated background shapes for gradient UI
 */
export function BackgroundShapes() {
  return (
    <>
      <div className="fixed top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-slate-200 dark:bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
      <div className="fixed top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
      <div className="fixed bottom-0 left-10 sm:left-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-slate-300 dark:bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
    </>
  );
}
