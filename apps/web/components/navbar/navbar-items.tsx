import { ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import { SearchInput } from "./search-input";
import LocaleSwitcher from "../locale-switcher/locale-switcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTranslations } from "next-intl";
import ThemeSelector from "../theme/theme-selector";
import NavigationLink from "./navigation-link";

export function NavbarItems() {
  const t = useTranslations("NavbarItems");
  return (
    <section className="flex lg:flex-row flex-col lg:justify-center lg:items-center lg-p-0 lg:p-0 p-8 justify-between items-start gap-4">
      <section className="flex gap-4">
        <NavigationLink href="/">{t("home")}</NavigationLink>
      </section>

      <SearchInput />

      <LocaleSwitcher />

      <div className="flex flex-row gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <ShoppingCart />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("cart")}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <User />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("account")}</p>
          </TooltipContent>
        </Tooltip>

        <ThemeSelector />
      </div>
    </section>
  );
}
