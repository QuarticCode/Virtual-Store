
"use client";

import { useCounterInput } from "@/hooks/use-counter-input";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

type Props = {
  amount: number;
  setAmount: (newAmount: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  showError?: (error: string) => void;
};

export function CounterInput({
  amount,
  setAmount,
  min = 1,
  max = 100,
  step = 1,
  className = "",
  showError,
}: Readonly<Props>) {
  const t = useTranslations("CounterInput");

  const {
    inputValue,
    increment,
    decrement,
    handleInputChange,
    handleInputSubmit,
    handleInputBlur,
    handleKeyDown,
    canIncrement,
    canDecrement,
  } = useCounterInput({
    initialAmount: amount,
    min,
    max,
    step,
    onError: showError,
    t,
  });

  const handleDecrement = () => {
    const newAmount = decrement();
    if (newAmount !== null) {
      setAmount(newAmount);
    }
  };

  const handleIncrement = () => {
    const newAmount = increment();
    if (newAmount !== null) {
      setAmount(newAmount);
    }
  };

  return (
    <TooltipProvider>
      <div
        className={`flex flex-row justify-between items-center border rounded-lg ${className}`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="rounded-l-lg hover:bg-accent">
              <Button
                className="w-8 h-8"
                variant="ghost"
                size="icon"
                onClick={handleDecrement}
                disabled={!canDecrement}
                type="button"
                aria-label={t("decrease")}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{t("decrease")}</p>
          </TooltipContent>
        </Tooltip>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="flex justify-center items-center text-md font-semibold w-12 h-8 text-center bg-accent focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label={t("quantity")}
          inputMode="numeric"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="rounded-r-lg hover:bg-accent">
              <Button
                className="w-8 h-8"
                variant="ghost"
                size="icon"
                onClick={handleIncrement}
                disabled={!canIncrement}
                type="button"
                aria-label={t("increase")}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{t("increase")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}