import {
  Globe,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-md p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            About TrendKart
          </h1>

          <p className="text-gray-600 mt-6 text-lg leading-8 max-w-3xl mx-auto">
            TrendKart is a modern ecommerce platform
            built to provide a smooth and enjoyable
            shopping experience. Discover trending
            products, manage your wishlist, add items
            to cart, and shop easily from anywhere.
          </p>

          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop"
            alt="About TrendKart"
            className="w-full h-72 md:h-96 object-cover rounded-3xl mt-10"
          />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-white rounded-3xl shadow-md p-6 text-center">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="text-blue-600" />
            </div>

            <h2 className="text-xl font-bold mt-5">
              Trending Products
            </h2>

            <p className="text-gray-500 mt-3 text-sm leading-6">
              Explore thousands of products from
              fashion, electronics, accessories,
              and more.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 text-center">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
              <Truck className="text-green-600" />
            </div>

            <h2 className="text-xl font-bold mt-5">
              Fast Delivery
            </h2>

            <p className="text-gray-500 mt-3 text-sm leading-6">
              Quick and secure delivery with real-time
              order tracking for every purchase.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 text-center">
            <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="text-yellow-600" />
            </div>

            <h2 className="text-xl font-bold mt-5">
              Secure Payments
            </h2>

            <p className="text-gray-500 mt-3 text-sm leading-6">
              Safe online transactions with trusted
              payment gateways and encryption.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 text-center">
            <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
              <Globe className="text-purple-600" />
            </div>

            <h2 className="text-xl font-bold mt-5">
              Worldwide Access
            </h2>

            <p className="text-gray-500 mt-3 text-sm leading-6">
              Shop from anywhere with a responsive
              platform built for all devices.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-3xl shadow-md p-8 md:p-10 mt-10">
          <h2 className="text-3xl font-bold text-center">
            Our Mission
          </h2>

          <p className="text-gray-600 text-center mt-6 leading-8 max-w-4xl mx-auto">
            Our mission is to make online shopping
            simple, fast, and enjoyable for everyone.
            We focus on modern UI design, smooth user
            experience, and high-quality products to
            create the best ecommerce experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;