
"use client";

import { validateCounterInput } from "@/lib/utils/validations/counter-input-schemas";
import { useState, useEffect, useCallback } from "react";

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
      setAmount(initialAmount);
      setInputValue(initialAmount.toString());
    }
  }, [initialAmount, isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(amount.toString());
    }
  }, [amount, isEditing]);

  const handleValidation = useCallback((value: string): number | null => {
    const result = validateCounterInput(value, min, max, t);

    if (!result.isValid && onError && result.error) {
      onError(result.error);
      return null;
    }

    return result.value || min;
  }, [min, max, t, onError]);

  const updateAmount = useCallback((newAmount: number): number => {
    const validated = Math.max(min, Math.min(max, newAmount));
    setAmount(validated);
    return validated;
  }, [min, max]);

  const increment = useCallback((): number => {
    const newAmount = updateAmount(amount + step);
    return newAmount;
  }, [amount, step, updateAmount]);

  const decrement = useCallback((): number => {
    const newAmount = updateAmount(amount - step);
    return newAmount;
  }, [amount, step, updateAmount]);

  const handleInputChange = (value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
      setIsEditing(true);
    }
  };

  const handleInputSubmit = useCallback((): number | null => {
    setIsEditing(false);
    const validated = handleValidation(inputValue);
    
    if (validated !== null) {
      const newAmount = updateAmount(validated);
      setInputValue(validated.toString());
      return newAmount;
    } else {
      setInputValue(amount.toString());
      return null;
    }
  }, [inputValue, amount, handleValidation, updateAmount]);

  const handleInputBlur = useCallback((): number | null => {
    return handleInputSubmit();
  }, [handleInputSubmit]);

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