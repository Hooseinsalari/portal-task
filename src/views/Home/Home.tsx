import HomeProducts from "./components/HomeProducts";
import HomeSearch from "./components/HomeSearch";
import { TProduct } from "./types/product.type";

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

type Props = {
  searchParams: { search?: string; category?: string };
};

async function ViewHome({ searchParams }: Props) {
  const search = searchParams.search || "";
  const category = searchParams.category || "all";

  const products = await fetchProducts();

  const categoryItems = Object.values(
    products.reduce(
      (a: { [key: string]: { category: string } }, { category }) => {
        a[category] = { category };
        return a;
      },
      {}
    )
  );

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || product.category === category)
  );

  return (
    <div className="px-4">
      <HomeSearch categoryItems={categoryItems} />
      <HomeProducts products={filteredProducts} />
    </div>
  );
}

export default ViewHome;
