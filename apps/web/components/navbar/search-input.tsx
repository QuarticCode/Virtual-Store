"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSearch } from "@/hooks/use-search";

export function SearchInput() {
  const { setSearch } = useSearch();
  const [input, setInput] = useState<string>("");
  const f = useTranslations("SearchInput");

  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <Input
        placeholder={f("placeholder")}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setSearch(input);
          }
        }}
      />
      <Button variant={"ghost"} size={"icon"} onClick={() => setSearch(input)}>
        <Search />
      </Button>
    </div>
  );
}
