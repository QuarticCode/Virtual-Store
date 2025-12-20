'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface CartButtonProps {
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon-only' | 'with-text';
  showText?: boolean;
}

export function AddToCartButton({
  onClick,
  className,
  size = 'md',
  variant = 'icon-only',
  showText = false
}: Readonly<CartButtonProps>) {
  const buttonVariant = variant === 'with-text' || showText ? 'with-text' : 'icon-only';
  
  const sizeClasses = {
    sm: buttonVariant === 'icon-only' ? 'h-8 w-8' : 'h-8 px-3',
    md: buttonVariant === 'icon-only' ? 'h-10 w-10' : 'h-10 px-4',
    lg: buttonVariant === 'icon-only' ? 'h-12 w-12' : 'h-12 px-5',
  };

  const t = useTranslations("CartButton");

  if (buttonVariant === 'with-text') {
    return (
      <Button
        variant="default"
        onClick={onClick}
        className={cn(
          'bg-orange-600 hover:bg-orange-700 transition-all ease-in-out duration-200',
          sizeClasses[size],
          className
        )}
        aria-label={t("addToCart")}
      >
        <div className="flex items-center gap-2">
          <Image
            src="/icons/cart.svg"
            alt={t("alt")}
            width="18"
            height="18"
            className="filter brightness-0 invert"
          />
          <span>{t("addToCart") || "Add to Cart"}</span>
        </div>
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      size="icon"
      onClick={onClick}
      className={cn(
        'bg-cart-button rounded-full shadow-lg cursor-pointer hover:bg-cart-button-hover',
        'shadow-[0_0_20px_rgba(250,84,28,0.4),0_0_40px_rgba(250,84,28,0.2)]',
        sizeClasses[size],
        className
      )}
      aria-label={t("addToCart")}
    >
      <div className="relative">
        <Image
          src="/icons/cart.svg"
          alt={t("alt")}
          width="18"
          height="18"
          className="filter brightness-0 invert"
        />
      </div>
    </Button>
  );
}