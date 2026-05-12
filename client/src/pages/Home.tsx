import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/products`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-blue-600 animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-red-600">{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛒 TrendKart Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition h-105 lg:h-110"
          >
            {/* Image */}
            <img
              src={item.images?.[0]}
              alt={item.title || "Product Image"}
              className="w-fit h-[60%] mx-auto object-contain"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold line-clamp-1">
                {item.title}
              </h2>

              <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                {item.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-green-600 font-bold">${item.price}</p>

                <button className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
