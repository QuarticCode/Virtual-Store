
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ReactNode } from "react";

interface ViewToggleButtonProps {
  viewType: "list" | "grid";
  currentView: "list" | "grid";
  onClick: () => void;
  icon: ReactNode;
  tooltipText: string;
}

export const ViewToggleButton = ({
  viewType,
  currentView,
  onClick,
  icon,
  tooltipText,
}: ViewToggleButtonProps) => {
  const isActive = currentView === viewType;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className={cn(
            "h-7 w-7 p-0 transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-sm",
            isActive
              ? "bg-view-toggle-active text-accent-foreground"
              : "text-muted-foreground"
          )}
          aria-pressed={isActive}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};