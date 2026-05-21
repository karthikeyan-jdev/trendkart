import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { useSingleProduct } from "../hooks/useSingleProduct";
import toast from "react-hot-toast";
import { Heart, ShoppingCart } from "lucide-react";
import { useAddToCart } from "../hooks/useAddToCart";
import type { Product } from "../types/productType";
import { useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "../types/cartType";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useRemoveWishlist } from "../hooks/useRemoveWishlist";
import { useAddToWishlist } from "../hooks/useAddToWishlist";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const { wishlistItems } = useAppSelector((state) => state.wishlist);

  // Cart
  const { data: cartItems = [] } = useCart();
  const { mutate: postCart } = useAddToCart();
  // Wishlist
  const { data } = useWishlist();
  const wishlistItem = data?.wishlist || [];
  const { mutate: postWish } = useAddToWishlist();
  const { mutate: removeWish } = useRemoveWishlist();
  // Wishlist
  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product,
  ) => {
    e.stopPropagation();

    // REMOVE wish
    if (isWishlist) {
      removeWish(item._id, {
        onSuccess: (data: { message: string }) => {
          queryClient.invalidateQueries({ queryKey: ["wishlist"] });

          toast.success(data.message || "Removed from wishlist");
        },

        onError: (error: any) => {
          toast.error(
            error.response?.data?.error || "Failed to remove wishlist",
          );
        },
      });

      return;
    }
    // ADD wish
    postWish(item._id, {
      onSuccess: (data: { message: string }) => {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });

        toast.success(data.message || "Added to wishlist ❤️");
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.error || "Failed to update wishlist";
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

  //get single product
  const { data: product, isLoading, error } = useSingleProduct(id || "");

  const isWishlist = wishlistItem.some(
    (item: Product) => item._id === product?._id,
  );

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
        <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-4 sm:p-6 md:p-8 relative">
          {/* Wishlist Button */}
          <button
            onClick={(e) => handleWishlist(e, product)}
            className="absolute top-4 right-4 bg-white border shadow-sm p-3 rounded-full hover:bg-gray-100 transition z-10"
          >
            <Heart
              size={22}
              className={
                isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
              }
            />
          </button>

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

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            {/* Add To Cart */}
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
            >
              <ShoppingCart size={16} />

              {cartItems.some(
                (cartItem: CartItem) => cartItem.product._id === product._id,
              )
                ? "Go to Cart"
                : "Add to Cart"}
            </button>

            {/* Buy Now */}
            <button
              onClick={(e) => handleBuyNow(e, product)}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
