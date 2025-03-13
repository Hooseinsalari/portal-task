import { TProduct } from "@/views/Home/types/product.type";
import Image from "next/image";
import { notFound } from "next/navigation";

async function fetchProduct(id: string | string[]): Promise<TProduct | null> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

type Props = {
  id: string;
};

async function ProductDetails({ id }: Props) {
  const product = await fetchProduct(id);

  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow">
      <Image
        src={product.image}
        width={500}
        height={500}
        alt={product.title}
        className="w-full h-[400px] object-contain mb-6"
        priority
      />

      <h1 className="text-2xl font-bold text-slate-800">{product.title}</h1>
      <h2 className="text-lg text-slate-500 my-2">{product.category}</h2>

      <p className="text-slate-600 leading-relaxed">{product.description}</p>

      <div className="mt-4 text-xl font-semibold">
        Price:{" "}
        <span className="text-green-600">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default ProductDetails;
