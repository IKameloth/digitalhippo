"use client";

import { CategoryValues } from "@/payload-types";
import { useProductList } from "@/hooks/useProductList";
import NavProduct from "./NavProduct";

interface NavItemProps {
  category: CategoryValues;
  onToggle: () => void;
}

const NavItem = ({ category, onToggle }: NavItemProps) => {
  const { map } = useProductList({
    category,
    limit: 3,
    sort: "desc",
  });

  if (map && map.length) {
    return (
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
            <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
              {map.map((product, i) => (
                <NavProduct
                  key={`product-${i}`}
                  product={product}
                  index={i}
                  onClose={onToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default NavItem;
