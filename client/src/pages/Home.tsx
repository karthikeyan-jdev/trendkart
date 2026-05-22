import Error from "../components/Error";
import { useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/productType";
import Skeleton from "../components/Skeleton";
import { useSearchParams } from "react-router-dom";
import useSearchProducts from "../hooks/useSearchProducts";

function Home() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  // Search Products
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchProducts(search);

  // Infinite Products
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();

  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  const products = search ? searchResults?.products || [] : allProducts;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Infinite Scroll only when NOT searching
  useEffect(() => {
    if (search) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, search]);

  if (isLoading || isSearchLoading) {
    return <Skeleton />;
  }

  if (error || searchError) {
    return <Error error={(error || searchError) as Error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item: Product) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>

      {/* Infinite Scroll */}
      {!search && (
        <>
          <div ref={loadMoreRef} className="h-10 mt-10" />

          {isFetchingNextPage && <Skeleton />}
        </>
      )}
    </div>
  );
}

export default Home;
