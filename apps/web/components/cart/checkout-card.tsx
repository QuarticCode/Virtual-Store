import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function CheckoutCard() {
  return (
    <Card className="w-md">
      <CardHeader className="m-0">
        <CardTitle className="font-bold">Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-between items-center">
        <h3>Subtotal</h3>
        <p>$0</p>
      </CardContent>
      <CardContent className="flex flex-row justify-between items-center">
        <h3>Shipping</h3>
        <p>$0</p>
      </CardContent>
      <CardFooter className="flex flex-col justify-between items-center">
        <CardContent className="flex flex-col w-full gap-4">
          <div className="flex flex-row justify-between items-center">
            <h3>Total</h3>
            <p>$0</p>
          </div>
          <Button className="flex w-full text-center">Checkout</Button>
        </CardContent>
      </CardFooter>
    </Card>
  );
}
