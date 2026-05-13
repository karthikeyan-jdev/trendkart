import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const Buy = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  // Total Price
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="w-8 h-8 text-blue-600" />

        <h1 className="text-3xl font-bold">Buy Products</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Products */}
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white border rounded-2xl p-4 flex flex-col sm:flex-row gap-5 shadow-sm"
              >
                {/* Image */}
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/details/${item._id}`)}
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-32 h-32 object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                      {item.description}
                    </p>

                    <p className="text-xl font-bold text-green-600 mt-3">
                      ${item.price}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-5">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                        className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => dispatch(increaseQuantity(item._id))}
                        className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Items</span>

                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>$10</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>

                <span>${(totalPrice + 10).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition text-lg font-medium">
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
