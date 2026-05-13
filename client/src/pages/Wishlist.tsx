import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { removeFromWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wishlistItems } = useAppSelector((state) => state.wishlist);
  const { cartItems } = useAppSelector((state) => state.cart);

  // Remove Wishlist
  const handleRemoveWishlist = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  // Add To Cart
  const handleAddToCart = (item: any) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id,
    );

    if (existingItem) {
      navigate("/cart");
      return;
    }

    dispatch(addToCart(item));
    toast.success("Added to cart 🛒");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-500 fill-red-500" />

          <h1 className="text-3xl font-bold">My Wishlist</h1>
        </div>

        {/* Empty */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md p-10 text-center">
            <Heart size={70} className="mx-auto text-gray-300" />

            <h2 className="text-2xl font-bold mt-5">Your wishlist is empty</h2>

            <p className="text-gray-500 mt-2">
              Save your favorite products here ❤️
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/details/${item._id}`)}
                  className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-full h-64 object-contain p-4"
                    />

                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        handleRemoveWishlist(item._id);
                      }}
                      className="absolute top-3 right-3 bg-white border shadow-sm p-2 rounded-full hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {item.description}
                    </p>

                    <p className="text-green-600 font-bold text-lg mt-4">
                      ${item.price}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-5">
                      {/* Cart */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          handleAddToCart(item);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                      >
                        <ShoppingCart size={18} />

                        {cartItems.some((cartItem) => cartItem._id === item._id)
                          ? "Go to Cart"
                          : "Add to Cart"}
                      </button>

                      {/* Buy */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          dispatch(addToCart(item));

                          navigate("/buy");
                        }}
                        className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-10 text-center">
              <p className="text-gray-500">
                Total Wishlist Items:
                <span className="font-bold text-black ml-2">
                  {wishlistItems.length}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
