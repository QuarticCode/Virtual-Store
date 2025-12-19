import Image from "next/image";

interface FlagIconProps {
  locale: string;
}

export default function FlagIcon({ locale }: FlagIconProps) {
  const flags: Record<string, string> = {
    en: "/flags/en.svg",
    es: "/flags/es.svg",
  };

  return (
    <Image
      src={flags[locale] || "/flags/en.svg"}
      alt="flag icon"
      width={35}
      height={30}
      className="rounded-sm"
    />
  );
}
