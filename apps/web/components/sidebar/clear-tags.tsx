"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useFilters } from "@/hooks/use-filters";

export function ClearTags() {
  const { clear } = useFilters();
  const t = useTranslations("Sidebar");
  return (
    <Button variant={"outline"} onClick={() => clear()}>
      <Trash /> {t("clear")}
    </Button>
  );
}
