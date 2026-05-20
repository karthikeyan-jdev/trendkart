import { useNavigate } from "react-router-dom";
import { useIncreaseQuantity } from "../hooks/useIncreaseQuantity";
import { useDecreaseQuantity } from "../hooks/useDecreaseQuantity";
import { useClearCart } from "../hooks/useClearCart";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";
import { useCart } from "../hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "../types/cartType";

const Cart = () => {
  const navigate = useNavigate();
  const { data: cartItems = [] } = useCart();
  const totalPrice = cartItems.reduce(
    (total: number, item: CartItem) => total + item.product.price * item.quantity,
    0,
  );

  const { mutate: increaseMutate } = useIncreaseQuantity();
  const { mutate: decreaseMutate } = useDecreaseQuantity();
  const { mutate: removeMutate } = useRemoveFromCart();
  const { mutate: clearMutate } = useClearCart();

  const queryClient = useQueryClient();
  // Increase
  const handleIncrease = (productId: string) => {
    increaseMutate(productId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  // Decrease
  const handleDecrease = (productId: string) => {
    decreaseMutate(productId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  // Remove
  const handleRemove = (productId: string) => {
    removeMutate(productId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  // Clear
  const handleClearCart = () => {
    clearMutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border p-4 rounded-xl"
            >
              <div
                className="flex items-center gap-4"
                onClick={() => navigate(`/details/${item.product._id}`)}
              >
                <img
                  src={item.product.images?.[0]}
                  alt={item.product.title}
                  className="w-20 h-20 object-contain"
                />

                <div>
                  <h2 className="font-semibold">{item.product.title}</h2>

                  <p>${item.product.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrease(item.product._id)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => handleIncrease(item.product._id)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Clear Cart
            </button>

            <div className="text-2xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
