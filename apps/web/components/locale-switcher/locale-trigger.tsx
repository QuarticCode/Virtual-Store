import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import FlagIcon from "./flag-icon";
import LoadingIndicator from "./loading-indicator";

interface LocaleTriggerProps {
  locale: string;
  isPending: boolean;
  label: string;
}

export default function LocaleTrigger({
  locale,
  isPending,
  label,
}: LocaleTriggerProps) {
  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className="h-9 gap-2 pl-2.5 pr-3 relative"
        disabled={isPending}
      >
        <div className="flex items-center gap-2">
          <FlagIcon locale={locale} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <ChevronDown className="h-3 w-3 opacity-50" />
        {isPending && <LoadingIndicator />}
      </Button>
    </DropdownMenuTrigger>
  );
}
