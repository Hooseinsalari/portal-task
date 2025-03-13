import ProductDetails from "./components/ProductDetails";

type Props = {
  id: string;
};

function ViewProduct({ id }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen py-10">
      <ProductDetails id={id} />
    </div>
  );
}

export default ViewProduct;
