import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../hooks/useCart";
import { useProfile } from "../hooks/useProfile";
import type { CartItem } from "../types/cartType";
import { checkoutSchema, type CheckoutFormData } from "../schemas/checkoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCreatePayment } from "../hooks/useCreatePayment";
import type { CreatePaymentResponse } from "../types/orderType";
const Checkout = () => {
  const navigate = useNavigate();
  const { data: userData } = useProfile();
  const { data: cartItems = [] } = useCart({ enabled: !!userData });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({ resolver: zodResolver(checkoutSchema) });

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total: number, item: CartItem) =>
        total + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const shippingCharge = 10;

  const finalTotal = totalPrice + shippingCharge;
  const { mutate: createPayment, isPending } = useCreatePayment();

  const onSubmit = (data: CheckoutFormData) => {
    const payload = {
      shippingAddress: data,
      items: cartItems,
      totalAmount: finalTotal,
    };
    createPayment(payload, {
      onSuccess: (data: CreatePaymentResponse) => {
        navigate(`/payment/${data.order._id}`);
      },

      onError: (error: any) => {
        console.error(error);
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout </h1>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border rounded-2xl p-6 space-y-5"
        >
          <h2 className="text-xl font-semibold">Shipping Address</h2>

          <div>
            <input
              {...register("fullName")}
              placeholder="Full Name"
              className="w-full border rounded-lg p-3"
            />
            <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className="w-full border rounded-lg p-3"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>

          <div>
            <textarea
              placeholder="Address"
              className="w-full border rounded-lg p-3 h-28"
              {...register("address")}
            />
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="City"
              className="border rounded-lg p-3"
              {...register("city")}
            />

            <p className="text-red-500 text-sm">{errors.city?.message}</p>

            <input
              placeholder="State"
              className="border rounded-lg p-3"
              {...register("state")}
            />
            <p className="text-red-500 text-sm">{errors.state?.message}</p>

            <input
              placeholder="Pincode"
              className="border rounded-lg p-3"
              {...register("pincode")}
            />
            <p className="text-red-500 text-sm">{errors.pincode?.message}</p>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            {isPending ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <div className="bg-white border rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map((item: CartItem) => (
              <div key={item.product._id} className="flex justify-between">
                <span>
                  {item.product.title} × {item.quantity}
                </span>

                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t mt-5 pt-5 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCharge}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
