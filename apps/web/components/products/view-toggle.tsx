"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useUIStore } from "@/lib/stores/ui.store";
import { ViewToggleButton } from "./view-toggle-button";
import { ListIcon } from "@/public/icons/list-icon";
import { GridIcon } from "@/public/icons/grid-icon";

export function ViewToggle({ className }: Readonly<{ className?: string }>) {
  const { viewMode, setViewMode } = useUIStore();
  const t = useTranslations("ViewToggle");

  const viewOptions = [
    {
      type: "list" as const,
      icon: <ListIcon />,
      label: t("list"),
      onClick: () => setViewMode("list"),
    },
    {
      type: "grid" as const,
      icon: <GridIcon />,
      label: t("grid"),
      onClick: () => setViewMode("grid"),
    },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-transparent bg-background p-0.5",
        "w-auto",
        className
      )}
    >
      <div className="flex items-center justify-center gap-0.5">
        {viewOptions.map((option) => (
          <ViewToggleButton
            key={option.type}
            viewType={option.type}
            currentView={viewMode}
            onClick={option.onClick}
            icon={option.icon}
            tooltipText={option.label}
          />
        ))}
      </div>
    </div>
  );
}