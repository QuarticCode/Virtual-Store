import * as React from "react";

import { SidebarItems } from "./sidebar-items";
import { SheetCategories } from "./sheet-categories";

export function AppSidebar() {
  return (
    <section className="w-64 mt-24">
      <SheetCategories />
      <div className="lg:flex hidden w-full">
        <SidebarItems />
      </div>
    </section>
  );
}
