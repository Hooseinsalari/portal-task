import ViewHome from "@/views/Home/Home";

export default function Home({
  searchParams,
}: {
  searchParams: { search?: string; category?: string };
}) {
  return <ViewHome searchParams={searchParams} />;
}
