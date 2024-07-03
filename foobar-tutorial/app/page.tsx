"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const groceryItems = [
    {
      id: 1,
      name: "Organic Apples",
      price: 3.99,
      quantity: 10,
      category: "Produce",
    },
    {
      id: 2,
      name: "Whole Wheat Bread",
      price: 2.49,
      quantity: 15,
      category: "Bakery",
    },
    {
      id: 3,
      name: "Grass-Fed Beef",
      price: 7.99,
      quantity: 8,
      category: "Meat",
    },
    {
      id: 4,
      name: "Almond Milk",
      price: 4.29,
      quantity: 12,
      category: "Dairy",
    },
    {
      id: 5,
      name: "Quinoa",
      price: 3.79,
      quantity: 20,
      category: "Grains",
    },
    {
      id: 6,
      name: "Organic Spinach",
      price: 2.99,
      quantity: 18,
      category: "Produce",
    },
    {
      id: 7,
      name: "Cage-Free Eggs",
      price: 4.99,
      quantity: 24,
      category: "Dairy",
    },
    {
      id: 8,
      name: "Whole Wheat Pasta",
      price: 2.79,
      quantity: 16,
      category: "Grains",
    },
  ];
  const filteredItems = groceryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };
  const updateCartQuantity = (itemId, quantity) => {
    setCart(
      cart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 bg-background p-6">
        <header className="mb-6 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for groceries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-muted bg-background pl-10 pr-4 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-muted bg-background p-4"
            >
              <img
                src="/placeholder.svg"
                alt={item.name}
                width={300}
                height={300}
                className="mb-4 rounded-md object-cover"
              />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <div className="text-primary">${item.price.toFixed(2)}</div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {item.quantity} in stock
              </div>
              <Button onClick={() => addToCart(item)} className="mt-4 w-full">
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-64 bg-muted p-6">
        <h2 className="mb-4 text-lg font-medium">Cart</h2>
        {cart.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <div>Total:</div>
              <div>${cartTotal.toFixed(2)}</div>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
