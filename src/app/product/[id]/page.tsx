import ViewProduct from "@/views/Product/Product";

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ViewProduct id={params.id} />;
}
