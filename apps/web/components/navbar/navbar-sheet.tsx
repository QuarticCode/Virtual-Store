import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { NavbarItems } from "./navbar-items";

export function NavbarSheet() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden flex" asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <NavbarItems />
      </SheetContent>
    </Sheet>
  );
}
