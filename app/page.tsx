"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [bill, setBill] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [customTip, setCustomTip] = useState<number>(0);
  const [people, setPeople] = useState(1);

  const handleTipSelect = (percentage:number) => {
    setTipPercentage(percentage);
    setCustomTip(0);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(Number(e.target.value));
    setTipPercentage(0);
  };

  const handlePeopleChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setPeople((prev) => prev + 1);
    } else if (type === "decrement" && people > 1) {
      setPeople((prev) => prev - 1);
    }
  };

  const tipAmount = customTip ? customTip : (bill * tipPercentage) / 100;
  const totalBill = bill + tipAmount;
  const totalPerPerson = totalBill / people;
  const tipPerPerson = tipAmount / people;

  return (
    <div className="bg-slate-400 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className="bg-[#37786d] text-white flex flex-col gap-4 max-w-[400px]">
          <CardHeader className="flex flex-col gap-4">
            <CardTitle>Tip Calculator</CardTitle>
            <CardDescription className="flex text-nowrap items-center justify-around gap-2">
              <h1 className="text-gray-900">Bill Subtotal :</h1>
              <Input
                className="text-white"
                type="number"
                value={bill === 0 ? "" : bill}
                onChange={(e) => setBill(Number(e.target.value))}
              />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <h1>Tip Percentage</h1>
            <div className="percentage grid grid-cols-3 gap-2">
              {[10, 15, 20, 25, 30].map((percentage) => (
                <Button
                  key={percentage}
                  className="flex flex-col h-14"
                  variant="outline"
                  onClick={() => handleTipSelect(percentage)}
                >
                  <p>{percentage}%</p>
                  <p>${((bill * percentage) / 100).toFixed(2)}</p>
                </Button>
              ))}
              <Button className="flex flex-col h-14" variant="outline">
                <p>Custom</p>
                <Input
                  type="number"
                  placeholder="Enter tip amount"
                  className="text-gray-900"
                  value={customTip || ""}
                  onChange={handleCustomTipChange}
                />
              </Button>
            </div>
            <div className="people flex items-center justify-around">
              <p className="text-gray-900">No. of people:</p>
              <div className="selectpeople grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={() => handlePeopleChange("increment")}>
                  +
                </Button>
                <Button variant='outline'><p className="text-gray-900">{people}</p></Button>
                <Button variant="outline" onClick={() => handlePeopleChange("decrement")}>
                  -
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="show_price w-full h-44 bg-[#064036] rounded-md flex flex-col justify-around text-center">
              <div className="per_person text-center">
                <h1 className="font-bold sm:text-2xl">${totalPerPerson.toFixed(2)}</h1>
                <h3 className="text-gray-900">Total Per Person</h3>
              </div>
              <div className="tip_per_person_&total flex justify-around">
                <div className="tip_per_person">
                  <h1 className="font-bold text-center sm:text-2xl">${tipPerPerson.toFixed(2)}</h1>
                  <h3 className="text-gray-900">Tip Per Person</h3>
                </div>
                <div className="total">
                  <h1 className="font-bold text-center sm:text-2xl">${totalBill.toFixed(2)}</h1>
                  <h3 className="text-gray-900">Bill Total</h3>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

