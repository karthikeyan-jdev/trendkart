import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginSchema, type LoginFormDataType } from "../schemas/login";
import { useLogin } from "../hooks/useLogin";
import { useQueryClient } from "@tanstack/react-query";
import { useSyncCart } from "../hooks/useSyncCart";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearCart } from "../store/cartSlice";
import { useSyncWishlist } from "../hooks/useSyncWishlist";
import { clearWishlist } from "../store/wishlistSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormDataType>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: postLogin, isPending } = useLogin();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { mutateAsync: syncCartMutation } = useSyncCart();
  const { mutateAsync: syncwishMutation } = useSyncWishlist();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistItems);

  const onSubmit = (data: LoginFormDataType) => {
    postLogin(data, {
      onSuccess: async (res) => {
        try {
          if (cartItems.length) {
            await syncCartMutation({
              items: cartItems.map((item) => ({
                productId: item.product._id,
                quantity: item.quantity,
              })),
            });
            dispatch(clearCart());
          }
          if (wishlistItems.length) {
            await syncwishMutation({
              items: wishlistItems.map((item) => item._id),
            });
            dispatch(clearWishlist());
          }
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          queryClient.invalidateQueries({ queryKey: ["wishlist"] });

          reset();
          navigate("/");
          toast.success(res.message || "Login successful");
        } catch (error) {
          console.error("ERROR:", error);
        }
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error || "Login failed");
      },
    });
  };

  return (
    <div className="min-h-160 sm:min-h-156 md:min-h-157 bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">TrendKart</h1>

          <p className="text-gray-500 mt-2">Welcome back</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="text-gray-400" size={20} />

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full ml-3 outline-none"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="text-gray-400" size={20} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                className="w-full ml-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
