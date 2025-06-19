"use client";
import { useSearchParams } from "next/navigation";
import { searchItems, products } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "ig");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="font-bold text-green-600">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Search products and supermarkets
  const { products: foundProducts, supermarkets: foundSupermarkets } = searchItems(query);

  // Extract unique categories from products and filter by query
  const allCategories = Array.from(new Set(products.map((p) => p.category)));
  const foundCategories = allCategories.filter((cat) => cat.toLowerCase().includes(query));

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Products</h2>
        {foundProducts.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {foundProducts.map((product) => (
              <li key={product.id} className="flex items-center gap-4 border p-2 rounded">
                <Link href={`/products/${product.id}`} className="flex items-center gap-4">
                  <Image src={product.image} alt={product.name} width={60} height={60} className="rounded" />
                  <div>
                    <div className="font-medium">{highlightMatch(product.name, query)}</div>
                    <div className="text-xs text-gray-500">{highlightMatch(product.category, query)}</div>
                    {product.supermarket && <div className="text-xs">{product.supermarket}</div>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Categories</h2>
        {foundCategories.length ? (
          <ul className="flex flex-wrap gap-2">
            {foundCategories.map((cat) => (
              <li key={cat}>
                <Link href={`/search?q=${encodeURIComponent(cat)}`} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {highlightMatch(cat, query)}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories found.</p>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Supermarkets</h2>
        {foundSupermarkets.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {foundSupermarkets.map((sm) => (
              <li key={sm.id} className="flex items-center gap-4 border p-2 rounded">
                <Link href={`/supermarkets/${sm.id}`} className="flex items-center gap-4">
                  <Image src={sm.image} alt={sm.name} width={60} height={60} className="rounded" />
                  <div>
                    <div className="font-medium">{highlightMatch(sm.name, query)}</div>
                    <div className="text-xs text-gray-500">{sm.deliveryTime}</div>
                    <div className="text-xs">{sm.distance}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No supermarkets found.</p>
        )}
      </div>
    </div>
  );
}
