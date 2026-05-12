import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const linkStyle = ({ isActive }: any) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-600 transition";

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

          {/* Search Toggle */}
          <button onClick={() => setShowSearch(!showSearch)}>
            {showSearch ? (
              <X className="w-6 h-6" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </button>

          {/* Cart */}
          <button className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              2
            </span>
          </button>

          {/* User */}
          <User className="hidden sm:block w-6 h-6 cursor-pointer" />

          {/* Mobile Menu */}
          <button className="lg:hidden">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="max-w-7xl mx-auto mt-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;