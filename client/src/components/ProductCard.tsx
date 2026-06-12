import { useNavigate } from "react-router-dom";
import type { Product } from "../types/productType";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useAddToCart } from "../hooks/useAddToCart";
import { useQueryClient } from "@tanstack/react-query";
import { useCart } from "../hooks/useCart";
import type { CartItem } from "../types/cartType";
import { useAppDispatch } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { useProfile } from "../hooks/useProfile";
import { useWishlistActions } from "../hooks/useWishlistActions";

const ProductCard = ({ item }: { item: Product }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  //profile
  const { data: userData } = useProfile();
  // Cart
  const { data: cartItems = [] } = useCart({ enabled: !!userData });
  const { mutate: postCart } = useAddToCart();

  // Product Details
  const handleClick = () => {
    navigate(`/details/${item._id}`);
  };

  const { isWishlist, handleWishlist } = useWishlistActions(item);

  // Add To Cart
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product,
  ) => {
    e.stopPropagation();

    const existingItem = cartItems.some(
      (cartItem: CartItem) => cartItem.product?._id === item._id,
    );

    if (existingItem) {
      navigate("/cart");
      return;
    }

    // Guest User
    if (!userData) {
      dispatch(
        addToCart({
          _id: crypto.randomUUID(),
          product: item,
          quantity: 1,
        }),
      );

      toast.success("Added to cart 🛒");
      return;
    }

    // Logged In User
    postCart(item._id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });

        toast.success(data.message);
      },

      onError: (error: any) => {
        toast.error(error.response?.data?.error || "Failed to add to cart");
      },
    });
  };

  // Buy Now
  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const existingItem = cartItems.some(
      (cartItem: CartItem) => cartItem.product?._id === item._id,
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
        navigate("/login");
      },
    });
  };
  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-114 lg:h-116 flex flex-col relative"
      onClick={handleClick}
    >
      {/* Wishlist Button */}{" "}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 bg-white border shadow-sm p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Heart
          size={18}
          className={isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}
        />{" "}
      </button>
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
        <h2 className="text-lg font-semibold line-clamp-1">{item.title}</h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-3">
          {item.description}
        </p>

        <div className="mt-auto pt-4">
          <p className="text-green-600 font-bold mb-3">${item.price}</p>

          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={(e) => handleAddToCart(e, item)}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
            >
              <ShoppingCart size={16} />

              {cartItems.some(
                (cartItem: CartItem) => cartItem.product?._id === item._id,
              )
                ? "Go to Cart"
                : "Add to Cart"}
            </button>

            {/* Buy */}
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
