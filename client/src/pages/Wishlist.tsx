import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddToCart } from "../hooks/useAddToCart";
import type { Product } from "../types/productType";
import { useQueryClient } from "@tanstack/react-query";
import { useCart } from "../hooks/useCart";
import type { CartItem } from "../types/cartType";
import { useWishlist } from "../hooks/useWishlist";
import { useRemoveWishlist } from "../hooks/useRemoveWishlist";

const Wishlist = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //cart
  const { data: cartItems = [] } = useCart();
  const { mutate: postCart } = useAddToCart();

  //wish
  const { data } = useWishlist();
  const wishlistItem = data?.wishlist || [];

  const { mutate: removeWish } = useRemoveWishlist();

  //remove wishlist
  const handleRemoveWishlist = (productId: string) => {
    removeWish(productId, {
      onSuccess: (data: { message: string }) => {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        toast.success(data.message || "Removed from wishlist");
      },
    });
  };

  // Add To Cart
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product,
  ) => {
    e.stopPropagation();

    const existingItem = cartItems.find(
      (cartItem: CartItem) => cartItem.product._id === item._id,
    );

    if (existingItem) {
      navigate("/cart");
      return;
    }

    postCart(item._id, {
      onSuccess: (data: { message: string }) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });

        toast.success(data.message || "Added to cart 🛒");
      },

      onError: (error: any) => {
        const message = error.response?.data?.error || "Failed to add to cart";

        toast.error(message);

        if (
          error.response?.status === 401 ||
          message.toLowerCase().includes("not authorized")
        ) {
          navigate("/login");
        }
      },
    });
  };

  // Buy Now
  const handleBuyNow = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product,
  ) => {
    e.stopPropagation();

    const existingItem = cartItems.find(
      (cartItem: CartItem) => cartItem.product._id === item._id,
    );

    if (existingItem) {
      navigate("/buy");
      return;
    }

    postCart(item._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });

        navigate("/buy");
      },

      onError: (error: any) => {
        toast.error(error.response?.data?.error || "Failed to add to cart");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold">My Wishlist</h1>
        </div>

        {/* Empty State */}
        {wishlistItem.length === 0 ? (
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
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItem.map((item: Product) => {
                const isInCart = cartItems.some(
                  (cartItem: CartItem) => cartItem.product._id === item._id,
                );

                return (
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

                      {/* Remove */}
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
                        {/* Add to Cart */}
                        <button
                          onClick={(e) => handleAddToCart(e, item)}
                          className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                        >
                          <ShoppingCart size={18} />

                          {isInCart ? "Go to Cart" : "Add to Cart"}
                        </button>

                        {/* Buy */}
                        <button
                          onClick={(e) => {
                            handleBuyNow(e, item);
                          }}
                          className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-10 text-center">
              <p className="text-gray-500">
                Total Wishlist Items:
                <span className="font-bold text-black ml-2">
                  {wishlistItem.length}
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
