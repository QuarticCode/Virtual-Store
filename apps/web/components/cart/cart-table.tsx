import { Product } from "../products/product-card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CartItem } from "./cart-item";

export function CartTable() {
  const products: Product[] = [
    {
      id: "89",
      name: "Jamón Rápido Bravo 2 kg",
      description:
        "Jamón con excelente sabor y consistencia. Ideal para preparar bocadillos y sándwich.",
      price: 13.16,
      imageUrl:
        "https://cdn.compratoday.com/products/Bravo/Jamón Rápido 2 kg.jpg",
    },
    {
      id: "1610",
      name: "Azúcar Blanca Santa Otilia Tipo A 1kg",
      description:
        "Paquete de 1 kg, ideal para endulzar bebidas y recetas con calidad garantizada.",
      price: 1.79,
      imageUrl:
        "https://cdn.compratoday.com/products/Azucar Blanca Santa Otilia.jpg",
    },
    {
      id: "1868",
      name: "Arroz Largo Fino Dulcinea 1kg",
      description:
        "Arroz de grano largo y fino, ideal como acompañamiento en una gran variedad de platos. Paquete de 1 kg de la marca Dulcinea.",
      price: 2.06,
      imageUrl:
        "https://cdn.compratoday.com/products/Arroz Largo Fino Dulcinea 1kg.jpg",
    },
    {
      id: "1869",
      name: "Harina de Trigo Tipo 000 Caserita 1kg",
      description:
        "Harina de trigo de molienda intermedia (tipo 000), marca Caserita, envase de 1 kg. Ideal para múltiples recetas domésticas como panes, bizcochos y masas comunes. Nacional de Argentina.",
      price: 1.46,
      imageUrl:
        "https://cdn.compratoday.com/products/Harina de Trigo Tipo 000 Caserita 1kg.jpg",
    },
  ];
  return (
    <Table className="lg:w-full min-w-4xl">
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => {
          return <CartItem product={p} key={p.id} />;
        })}
      </TableBody>
    </Table>
  );
}
