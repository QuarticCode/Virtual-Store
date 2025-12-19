"use client";

import { useEffect, useState } from "react";
import { Category } from "./category";
import { Badge } from "../ui/badge";
import { CategorySkeleton } from "./category-skeleton";
import { useFilters } from "@/hooks/use-filters";

export function SubCategory({ category }: { category: Category }) {
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { setFilter } = useFilters();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/categories/${category.id}`);

        if (!response.ok) {
          throw new Error("Error al cargar categorías");
        }

        const categoriesResult = await response.json();

        if (
          categoriesResult.categories &&
          Array.isArray(categoriesResult.categories)
        ) {
          setSubCategories(categoriesResult.categories);
        } else {
          setSubCategories([]);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setSubCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [category.id]);

  return (
    <>
      {loading ? (
        <CategorySkeleton />
      ) : (
        subCategories.map((subCategory) => (
          <Badge key={subCategory.id} onClick={() => setFilter(subCategory)}>
            {subCategory.name}
          </Badge>
        ))
      )}
    </>
  );
}
