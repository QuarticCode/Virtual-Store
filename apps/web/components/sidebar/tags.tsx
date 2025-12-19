"use client";

import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useTranslations } from "next-intl";
import { useFilters } from "@/hooks/use-filters";
import { Badge } from "../ui/badge";

export function Tags() {
  const { categories } = useFilters();
  const t = useTranslations("Sidebar");

  return (
    <Collapsible title={t("tags")} defaultOpen className="group/collapsible">
      <CollapsibleTrigger className="flex flex-row justify-center items-center gap-4">
        {t("tags")}
        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <section className="flex w-full flex-wrap gap-2 m-2">
          {categories.length === 0 ? (
            <h1 className="text-lg font-light">{t("empty")}</h1>
          ) : (
            categories.map((c) => {
              return <Badge key={c.id}>{c.name}</Badge>;
            })
          )}
        </section>
      </CollapsibleContent>
    </Collapsible>
  );
}
