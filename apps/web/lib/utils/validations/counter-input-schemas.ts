
import { z } from "zod";
import { getTranslations } from "next-intl/server";

export async function createCounterSchema(
  min: number = 1,
  max: number = 100,
  locale: string = "en"
) {
  const t = await getTranslations({ locale, namespace: "CounterInput" });

  return z
    .number()
    .int()
    .min(min, { message: t("errors.minValue", { min }) })
    .max(max, { message: t("errors.maxValue", { max }) });
}

const defaultMessages = {
  invalidNumber: "Please enter a valid number",
  invalidValue: "Invalid value",
  minValue: (min: number) => `Minimum value is ${min}`,
  maxValue: (max: number) => `Maximum value is ${max}`,
};

export function validateCounterInput(
  value: string,
  min: number = 1,
  max: number = 100,
  t?: (key: string, values?: Record<string, any>) => string
): { isValid: boolean; value?: number; error?: string } {
  try {
    if (value.trim() === "") {
      return { isValid: true, value: min };
    }

    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      return {
        isValid: false,
        error: t
          ? t("errors.invalidNumber")
          : defaultMessages.invalidNumber,
      };
    }

    if (numericValue < min) {
      return {
        isValid: false,
        error: t
          ? t("errors.minValue", { min })
          : defaultMessages.minValue(min),
      };
    }

    if (numericValue > max) {
      return {
        isValid: false,
        error: t
          ? t("errors.maxValue", { max })
          : defaultMessages.maxValue(max),
      };
    }

    if (!Number.isInteger(numericValue)) {
      return {
        isValid: false,
        error: t ? t("errors.invalidNumber") : defaultMessages.invalidNumber,
      };
    }

    return { isValid: true, value: numericValue };
  } catch {
    return {
      isValid: false,
      error: t ? t("errors.invalidValue") : defaultMessages.invalidValue,
    };
  }
}