const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            🛒 TrendKart
          </h2>

          <p className="text-gray-400 text-sm leading-6">
            Discover trendy products, amazing deals, and seamless shopping
            experiences all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition cursor-pointer">Home</li>

            <li className="hover:text-white transition cursor-pointer">
              Categories
            </li>

            <li className="hover:text-white transition cursor-pointer">Cart</li>

            <li className="hover:text-white transition cursor-pointer">
              Wishlist
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>

          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition cursor-pointer">
              Help Center
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Shipping Info
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Returns
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe Newsletter</h3>

          <p className="text-gray-400 text-sm mb-4">
            Get updates about new products and offers.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:border-blue-500"
            />

            <button className="bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded-lg font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-5 text-center text-gray-500 text-sm">
        © 2026 TrendKart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
