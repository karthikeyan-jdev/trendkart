import {
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Navigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import Loading from "../components/Loading";

const Profile = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { wishlistItems } = useAppSelector((state) => state.wishlist);

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-medium"
      : "flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-xl transition";

  const { data: user, isLoading, isError } = useProfile();
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-3xl shadow-md p-6 h-fit">
          {/* Profile */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://i.pravatar.cc/200"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
            />

            <h2 className="text-2xl font-bold mt-4">{user?.name ?? "user"}</h2>

            {/* <p className="text-gray-500 text-sm">MERN Stack Developer</p> */}

            <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
              <MapPin size={15} />
              Chennai, India
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-col gap-2">
            <NavLink to="/profile" className={linkStyle}>
              <User size={20} />
              My Profile
            </NavLink>

            <NavLink to="/orders" className={linkStyle}>
              <Package size={20} />
              Orders
            </NavLink>

            <NavLink to="/wishlist" className={linkStyle}>
              <Heart size={20} />
              Wishlist
            </NavLink>

            <NavLink to="/cart" className={linkStyle}>
              <ShoppingBag size={20} />
              Cart
            </NavLink>

            <NavLink to="/settings" className={linkStyle}>
              <Settings size={20} />
              Settings
            </NavLink>

            <button className="flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl transition">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl shadow-md p-6">
              <p className="text-gray-500 text-sm">Total Orders</p>

              <h2 className="text-3xl font-bold mt-2">12</h2>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <p className="text-gray-500 text-sm">Wishlist Items</p>

              <h2 className="text-3xl font-bold mt-2">
                {wishlistItems.length}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <p className="text-gray-500 text-sm">Cart Items</p>

              <h2 className="text-3xl font-bold mt-2">{cartItems.length}</h2>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>

                <input
                  type="text"
                  value={user?.name ?? "user"}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Email</label>

                <input
                  type="email"
                  value={user?.email ?? "user@example.com"}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Phone</label>

                <input
                  type="text"
                  value={user?.phone ?? "+91 9876543210"}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Location</label>

                <input
                  type="text"
                  value={user?.location ?? "Chennai, India"}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
            </div>

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border rounded-2xl p-4">
                <div>
                  <h3 className="font-semibold">iPhone 15 Pro</h3>

                  <p className="text-sm text-gray-500">Order #12345</p>
                </div>

                <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium">
                  Delivered
                </span>
              </div>

              <div className="flex items-center justify-between border rounded-2xl p-4">
                <div>
                  <h3 className="font-semibold">Nike Sneakers</h3>

                  <p className="text-sm text-gray-500">Order #12346</p>
                </div>

                <span className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full text-sm font-medium">
                  Shipping
                </span>
              </div>

              <div className="flex items-center justify-between border rounded-2xl p-4">
                <div>
                  <h3 className="font-semibold">Smart Watch</h3>

                  <p className="text-sm text-gray-500">Order #12347</p>
                </div>

                <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                  Processing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
