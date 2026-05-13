import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useAppSelector } from "../hooks/redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state.cart);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // Search State
  const [search, setSearch] = useState("");

  const linkStyle = ({ isActive }: any) =>
    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600 transition";

  // Search Submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
    setShowSearch(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-blue-600">
          🛒 TrendKart
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6 font-medium">
          <li>
            <NavLink to="/" className={linkStyle}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className={linkStyle}>
              Products
            </NavLink>
          </li>

          <li>
            <NavLink to="/categories" className={linkStyle}>
              Categories
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={linkStyle}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button onClick={() => setShowSearch(!showSearch)}>
            {showSearch ? (
              <X className="w-6 h-6" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </button>

          {/* Wishlist */}
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500 transition"
            }
          >
            <Heart className="w-6 h-6" />
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative ${
                isActive ? "text-blue-600" : "hover:text-blue-600 transition"
              }`
            }
          >
            <ShoppingCart className="w-6 h-6" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {cartItems.length}
            </span>
          </NavLink>

          {/* User */}
          <NavLink to="/profile">
            <User className="hidden sm:block w-6 h-6 cursor-pointer" />
          </NavLink>

          {/* Mobile Menu */}
          <button className="lg:hidden" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <form onSubmit={handleSearch} className="max-w-7xl mx-auto mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      )}

      {/* Mobile Menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setShowMenu(false)}
        >
          {/* Menu Panel */}
          <div
            className="absolute top-0 left-0 h-full w-72 bg-white shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-blue-600">Menu</h2>

              <button
                onClick={() => setShowMenu(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-5 font-medium text-lg">
              <li>
                <NavLink
                  to="/"
                  className={linkStyle}
                  onClick={() => setShowMenu(false)}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className={linkStyle}
                  onClick={() => setShowMenu(false)}
                >
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/categories"
                  className={linkStyle}
                  onClick={() => setShowMenu(false)}
                >
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/wishlist"
                  className={linkStyle}
                  onClick={() => setShowMenu(false)}
                >
                  Wishlist
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/cart"
                  className={linkStyle}
                  onClick={() => setShowMenu(false)}
                >
                  Cart
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={linkStyle}
                  onClick={() => setShowMenu(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
