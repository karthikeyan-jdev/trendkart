import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useSingleProduct } from "../hooks/useSingleProduct";

const ProductDetails = () => {
  const { id } = useParams();

  const { data: product, isLoading, error } = useSingleProduct(id || "");

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof Error) {
    return <Error error={error} />;
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Product Image */}
        <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full h-62.5 sm:h-80 md:h-100 lg:h-125">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x600";
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-sm text-blue-600 font-medium mb-2">
            {product.category.name}
          </p>

          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

          <p className="text-xl md:text-2xl text-green-600 font-bold mt-4">
            ${product.price}
          </p>
          <p className="text-sm md:text-base text-gray-600 mt-6 leading-6 md:leading-7">
            {product.description}
          </p>

          <button className="mt-8 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
