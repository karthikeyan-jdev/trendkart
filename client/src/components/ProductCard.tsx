import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

const ProductCard = ({ item }: { item: Product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/details/${item.id}`);
  };
  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-103 lg:h-106 flex flex-col"
      onClick={handleClick}
    >
      {/* Image */}
      <img
        src={item.images?.[0]}
        alt={item.title || "Product Image"}
        className="w-full h-60 object-contain p-2"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/300x300";
        }}
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {" "}
        <h2 className="text-lg font-semibold line-clamp-1">{item.title}</h2>
        <p className="text-gray-500 text-sm mt-2 line-clamp-3">
          {item.description}
        </p>
        <div className="mt-auto pt-4 flex items-center justify-between">
          {" "}
          <p className="text-green-600 font-bold">${item.price}</p>
          <button className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
