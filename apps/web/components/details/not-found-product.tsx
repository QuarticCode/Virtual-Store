import { useTranslations } from "next-intl";

export function NotFoundProduct() {
  const t = useTranslations("Details");
  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 animate-fade-in">
      <div className="text-orange-700 font-medium"> {t("error")} </div>
      <div className="text-orange-600 text-sm mt-1">{t("notFound")}</div>
      <button
        onClick={() => window.location.reload()}
        className="mt-3 text-sm text-orange-700 hover:orange-red-900 underline"
      >
        {t("retry")}
      </button>
    </div>
  );
}
