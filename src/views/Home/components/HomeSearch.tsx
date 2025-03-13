"use client";

import { Input } from "@/components/Input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select/Select";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  categoryItems: Record<"category", string>[];
};

function HomeSearch({ categoryItems }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("search", value);
    else params.delete("search");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategory = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-center flex-row gap-4 my-8">
      <Input
        placeholder="Search"
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Select
        defaultValue={searchParams.get("category") || "all"}
        onValueChange={handleCategory}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categoryItems.map((item) => (
            <SelectItem value={item.category} key={item.category}>
              {item.category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default HomeSearch;
