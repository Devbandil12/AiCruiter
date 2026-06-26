export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-xl text-gray-500 dark:text-gray-400">Page not found</p>
      <a
        href="/Home"
        className="mt-4 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold transition-colors"
      >
        Go Home
      </a>
    </div>
  );
}
