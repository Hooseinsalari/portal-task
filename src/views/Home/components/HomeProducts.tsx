import Image from "next/image";
import { TProduct } from "../types/product.type";
import { truncateText } from "@/lib/helpers/truncateText";
import Link from "next/link";

async function fetchProducts(): Promise<TProduct[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function HomeProducts() {
  const products = await fetchProducts();

  if (!products.length) {
    return (
      <div className="text-center text-slate-500 py-10">
        No products available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {products.map((item) => (
        <Link
          href={`product/${item.id}`}
          key={item.id}
          className="bg-white rounded-md shadow overflow-hidden px-4"
        >
          <Image
            src={item.image}
            width={500}
            height={500}
            alt="product-image"
            className="w-full h-80 py-2"
          />

          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-slate-800 text-sm font-semibold">
                {truncateText(item.title)}
              </h3>
              <h4 className="text-slate-400 text-xs font-normal">
                {item.category}
              </h4>
            </div>
            <h3 className="text-sm font-semibold">
              <span>$</span> {item.price}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HomeProducts;
