"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/payload-types";
import { Sparkles } from "lucide-react";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? (
        <span className="font-semibold flex items-center justify-center">
          Added! <Sparkles className="ml-2 size-5" />
        </span>
      ) : (
        "Add to cart"
      )}
    </Button>
  );
};

export default AddToCartButton;
