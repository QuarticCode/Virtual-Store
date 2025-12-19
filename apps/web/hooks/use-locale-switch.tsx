"use client";

import { Locale } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";

export function useLocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: Locale) => {
    if (isPending) return;

    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  };

  return {
    handleLocaleChange,
    isPending,
  };
}
