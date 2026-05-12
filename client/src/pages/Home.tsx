import Error from "../components/Error";
import Loading from "../components/Loading";
import { useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";

function Home() {
  
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  // flatten pages
  const products = data?.pages.flatMap((page) => page.products) || [];

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof Error) {
    return <Error error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item: Product) => (
          <ProductCard key={item.id} item={item}  />
        ))}
      </div>
      {/* observer target */}
      <div ref={loadMoreRef} className="h-10 mt-10" />

      {isFetchingNextPage && <Loading />}
    </div>
  );
}

export default Home;
