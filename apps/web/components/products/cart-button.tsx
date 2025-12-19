'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface CartButtonProps {
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CartButton({
  onClick,
  className,
  size = 'md'
}: Readonly<CartButtonProps>) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const t = useTranslations("CartButton");

  return (
    <Button
      variant="default"
      size="icon"
      onClick={onClick}
      className={cn(
        'bg-cart-button rounded-full shadow-lg cursor-pointer transition-all duration-300',
        'opacity-0 transform translate-y-2 scale-95 hover:bg-cart-button-hover',
        'group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100',
        'shadow-[0_0_20px_rgba(250,84,28,0.4),0_0_40px_rgba(250,84,28,0.2)]',
        sizeClasses[size],
        className
      )}
      aria-label={t("addToCart")}
    >
      <div className="relative">
        <Image
          src="/cart.svg"
          alt={t("alt")}
          width="18"
          height="18"
          className="filter brightness-0 invert"
        />
      </div>
    </Button>
  );
}