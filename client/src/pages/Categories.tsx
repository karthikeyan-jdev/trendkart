import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";

import { useCategories } from "../hooks/useCategories";

const Categories = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useCategories();

  const handleCategoryClick = (slug: string) => {
    navigate(`/products?search=${slug}`);
  };

  if (isLoading) return <Loading />;

  if (error instanceof Error) {
    return <Error error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500 mt-3">
            Explore products by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((category: any) => (
            <div
              key={category.slug}
              onClick={() =>
                handleCategoryClick(category.slug)
              }
              className="relative h-72 rounded-3xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-3xl font-bold">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;