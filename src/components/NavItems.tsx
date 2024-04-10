"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleToggle = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const isOpen = i === activeIndex;

        return (
          <div key={category.value} className="flex animate">
            <div className="relative flex items-center">
              <Button
                className="gap-1.5"
                onClick={handleToggle}
                variant={isOpen ? "secondary" : "ghost"}
              >
                {category.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-all text-muted-foreground",
                    {
                      "-rotate-180": isOpen,
                    }
                  )}
                />
              </Button>
            </div>
            {isOpen ? (
              <div
                onClick={() => close()}
                className="absolute inset-x-0 top-full text-sm text-muted-foreground animate-fade-in-down transition duration-300 ease-in-out drop-shadow-md"
              >
                <div
                  className="absolute inset-0 top-1/2 bg-white shadow"
                  aria-hidden="true"
                />
                <NavItem
                  category={category.value}
                  onToggle={handleToggle}
                  key={category.value}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default NavItems;
