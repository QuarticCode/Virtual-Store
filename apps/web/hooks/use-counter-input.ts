
"use client";

import { validateCounterInput } from "@/lib/utils/validations/counter-input-schemas";
import { useState, useEffect } from "react";

interface UseCounterInputProps {
  initialAmount: number;
  min?: number;
  max?: number;
  step?: number;
  onError?: (error: string) => void;
  t?: (key: string, values?: Record<string, any>) => string;
}

export function useCounterInput({
  initialAmount,
  min = 1,
  max = 100,
  step = 1,
  onError,
  t,
}: UseCounterInputProps) {
  const [amount, setAmount] = useState(initialAmount);
  const [inputValue, setInputValue] = useState(initialAmount.toString());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(amount.toString());
    }
  }, [amount, isEditing]);

  const handleValidation = (value: string): number | null => {
    const result = validateCounterInput(value, min, max, t);

    if (!result.isValid && onError && result.error) {
      onError(result.error);
      return null;
    }

    return result.value || min;
  };

  const updateAmount = (newAmount: number) => {
    const validated = Math.max(min, Math.min(max, newAmount));
    setAmount(validated);
    return validated;
  };

  const increment = () => {
    return updateAmount(amount + step);
  };

  const decrement = () => {
    return updateAmount(amount - step);
  };

  const handleInputChange = (value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
      setIsEditing(true);
    }
  };

  const handleInputSubmit = () => {
    setIsEditing(false);
    const validated = handleValidation(inputValue);
    if (validated !== null) {
      setAmount(validated);
      setInputValue(validated.toString());
    }
  };

  const handleInputBlur = () => {
    handleInputSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  return {
    amount,
    inputValue,
    isEditing,
    increment,
    decrement,
    handleInputChange,
    handleInputSubmit,
    handleInputBlur,
    handleKeyDown,
    canIncrement: amount < max,
    canDecrement: amount > min,
  };
}