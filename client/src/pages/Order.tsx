import { Package } from "lucide-react";

const Orders = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-10 text-center pt-15">
      <Package size={70} className="mx-auto text-gray-300" />

      <h2 className="text-2xl font-bold mt-5">No Orders Yet</h2>

      <p className="text-gray-500 mt-2">
        Start shopping to see your orders here.
      </p>
    </div>
  );
};

export default Orders;
