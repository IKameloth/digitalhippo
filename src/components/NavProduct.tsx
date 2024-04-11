"use client";

import { Product } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import ImageSlider from "./ImageSlider";
import Image from "next/image";

interface NavProductProps {
  product: Product | null;
  index: number;
  onClose: () => void;
}

const NavProduct = ({ product, index, onClose }: NavProductProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <div className="group relative text-base sm:text-sm">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
          <a href={`/product/${product.id}`}>
            <Image
              src={validUrls[0]}
              alt="product category image"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </a>
        </div>
        <p className="mt-1" aria-hidden="true">
          {label}
        </p>
        <p className="mt-6 font-bold text-gray-900">{product.name}</p>
        <Link
          href={`/product/${product.id}`}
          className="mt-2 block font-medium text-gray-900"
        >
          Shop now
        </Link>
      </div>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="group relative text-base sm:text-sm">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-1 w-[10rem] h-4 rounded-lg" />
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-1 w-2/3 h-4 rounded-lg" />
    </div>
  );
};

export default NavProduct;
