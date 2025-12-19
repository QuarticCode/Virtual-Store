"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SubCategory } from "./sub-category";
import { CategorySkeleton } from "./category-skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";

export type Category = {
  id: number;
  name: string;
  enabled: boolean;
};

export function Category() {
  const t = useTranslations("Sidebar");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Error al cargar categorías");
        }

        const categoriesResult = await response.json();

        if (
          categoriesResult.categories &&
          Array.isArray(categoriesResult.categories)
        ) {
          setCategories(categoriesResult.categories);
        } else {
          setCategories([]);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <Collapsible
      title={t("categories")}
      defaultOpen
      className="group/collapsible"
    >
      <CollapsibleTrigger className="flex flex-row justify-center items-center gap-4">
        {t("categories")}
        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {loading ? (
          <CategorySkeleton />
        ) : (
          <Accordion
            type="single"
            collapsible
            className="min-w-52"
            defaultValue="item-1"
          >
            {categories.map((category) => (
              <AccordionItem value={`${category.id}`} key={category.id}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent className="flex flex-row container gap-2 flex-wrap">
                  <SubCategory key={category.id} category={category} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
