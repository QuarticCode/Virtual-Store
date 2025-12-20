
"use client";

import { useCounterInput } from "@/hooks/use-counter-input";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
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
    if (newAmount !== undefined && newAmount !== amount) {
      setAmount(newAmount);
    }
  };

  const handleIncrement = () => {
    const newAmount = increment();
    if (newAmount !== undefined && newAmount !== amount) {
      setAmount(newAmount);
    }
  };

  const handleInputSubmitWrapper = () => {
    const newAmount = handleInputSubmit();
    if (newAmount !== null && newAmount !== undefined && newAmount !== amount) {
      setAmount(newAmount);
    }
  };

  const handleInputBlurWrapper = () => {
    const newAmount = handleInputBlur();
    if (newAmount !== null && newAmount !== undefined && newAmount !== amount) {
      setAmount(newAmount);
    }
  };

  const buttonClassName =
    "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 hover:bg-general-button-hover transition-all duration-400";

  return (
    <TooltipProvider>
      <div
        className={`flex flex-row gap-0.5 h-7 sm:h-8 md:h-9 justify-between items-center border rounded-lg ${className}`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={buttonClassName}
              variant="ghost"
              size="icon"
              onClick={handleDecrement}
              disabled={amount <= min}
              type="button"
              aria-label={t("decrease")}
            >
              <Minus className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t("decrease")}</p>
          </TooltipContent>
        </Tooltip>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlurWrapper}
          onKeyDown={(e) => {
            handleKeyDown(e);
            if (e.key === "Enter") {
              handleInputSubmitWrapper();
            }
          }}
          className="flex justify-center items-center text-xs sm:text-sm md:text-base font-semibold w-8 sm:w-10 md:w-10 h-full text-center bg-accent focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label={t("quantity")}
          inputMode="numeric"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={buttonClassName}
              variant="ghost"
              size="icon"
              onClick={handleIncrement}
              disabled={amount >= max}
              type="button"
              aria-label={t("increase")}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t("increase")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}