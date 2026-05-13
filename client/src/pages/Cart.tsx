import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-4 rounded-xl"
            >
              <div
                className="flex items-center gap-4"
                onClick={() => navigate(`/details/${item._id}`)} //for this i cant use buttons
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />

                <div>
                  <h2 className="font-semibold">{item.title}</h2>

                  <p>${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item._id))}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item._id))}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right text-2xl font-bold mt-6">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
