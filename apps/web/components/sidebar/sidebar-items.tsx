import { Category } from "../category/category";
import { ClearTags } from "./clear-tags";
import { Tags } from "./tags";

export function SidebarItems() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <Category />
      <Tags />
      <ClearTags />
    </div>
  );
}
