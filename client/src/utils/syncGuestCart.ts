import { store, type AppDispatch } from "../store/store";
import { clearCart } from "../store/cartSlice";

export const syncGuestCart = async (
  syncCartMutation: any,
  dispatch: AppDispatch,
) => {
  const guestCart = store.getState().cart.cartItems;

  if (!guestCart.length) return;

  try {
    await syncCartMutation({
      items: guestCart,
    });

    dispatch(clearCart());
  } catch (error) {
    console.error(error);
  }
};
