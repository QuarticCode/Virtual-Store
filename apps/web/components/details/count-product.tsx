import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  amount: number;
  setAmount: (new_amount: number) => void;
};

export function CountProduct({ amount, setAmount }: Props) {
  const controllerAmount = (e: number) => (e < 0 ? setAmount(0) : setAmount(e));

  return (
    <div className="flex flex-row justify-between gap-2 w-32 items-center">
      <Button
        className="w-8 h-8"
        variant={"outline"}
        onClick={() => controllerAmount(amount - 1)}
      >
        <Minus />
      </Button>
      <p className="flex justify-center items-center text-lg font-semibold rounded-md w-8 h-8 text-center">
        {amount}
      </p>
      <Button
        className="w-8 h-8"
        variant={"outline"}
        onClick={() => controllerAmount(amount + 1)}
      >
        <Plus />
      </Button>
    </div>
  );
}
