import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { SidebarItems } from "./sidebar-items";

export function SheetCategories() {
  const t = useTranslations("Sidebar");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden flex flex-row gap-2 items-center justify-center">
          <Filter />
          {t("filter")}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("categories")}</SheetTitle>
        </SheetHeader>
        <SidebarItems />
      </SheetContent>
    </Sheet>
  );
}
