"use client";

import Image from "next/image";
import { Product } from "../products/product-card";
import { TableCell, TableRow } from "../ui/table";
import { CountProduct } from "../details/count-product";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function CartItem({ product }: { product: Product }) {
  const [amount, setAmount] = useState<number>(0);
  return (
    <TableRow className="lg:max-w-4xl max-w-2xl max-h-40">
      <TableCell className="rounded-md">
        <Image
          src={product.imageUrl}
          width={80}
          height={80}
          alt="Product Image"
        />
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        <CountProduct amount={amount} setAmount={setAmount} />
      </TableCell>
      <TableCell className="text-center font-semibold">
        ${product.price * amount}
      </TableCell>
      <TableCell>
        <Trash2 />
      </TableCell>
    </TableRow>
  );
}
