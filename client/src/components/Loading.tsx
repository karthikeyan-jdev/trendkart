import { ShoppingCart } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 overflow-hidden">
      {/* Background Glow */}{" "}
      <div className="absolute w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      {/* Main Content */}
      <div className="relative flex flex-col items-center">
        {/* Rotating Rings */}
        <div className="relative flex items-center justify-center">
          {/* <div className="absolute w-32 h-32 border-4 border-green-200 rounded-full animate-spin"></div> */}

          {/* <div className="absolute w-24 h-24 border-4 border-t-green-600 border-green-100 rounded-full animate-spin [animation-duration:1.5s]"></div> */}

          {/* Cart Icon */}
          <div className="bg-green-600 p-5 rounded-full shadow-2xl animate-bounce">
            <ShoppingCart className="text-white w-10 h-10" />
          </div>
        </div>

        {/* Brand */}
        <h1 className="mt-8 text-4xl font-extrabold tracking-wide">
          <span className="text-black">Trend</span>
          <span className="text-green-600">Kart</span>
        </h1>

        {/* Animated Text */}
        <div className="flex gap-1 mt-3 text-gray-500 text-sm font-medium">
          <span className="animate-bounce [animation-delay:0ms]">L</span>
          <span className="animate-bounce [animation-delay:100ms]">o</span>
          <span className="animate-bounce [animation-delay:200ms]">a</span>
          <span className="animate-bounce [animation-delay:300ms]">d</span>
          <span className="animate-bounce [animation-delay:400ms]">i</span>
          <span className="animate-bounce [animation-delay:500ms]">n</span>
          <span className="animate-bounce [animation-delay:600ms]">g</span>
          <span className="animate-bounce [animation-delay:700ms]">.</span>
          <span className="animate-bounce [animation-delay:800ms]">.</span>
          <span className="animate-bounce [animation-delay:900ms]">.</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
