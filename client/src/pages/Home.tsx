export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Flyticket</h1>
      <p className="text-lg text-gray-700 mb-8">Discover the best flights happening around you!</p>
      <a href="/concerts" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Explore Concerts
      </a>
    </div>
  );
}
