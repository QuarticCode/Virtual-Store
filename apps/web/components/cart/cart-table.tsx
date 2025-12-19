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
  const products: Product[] = [];
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
