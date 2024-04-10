"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/payload-types";
import { useAuth } from "@/hooks/useAuth";
import Cart from "./Cart";

interface MobileNavProps {
  user: User | null;
}

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div className="lg:hidden z-20 fixed top-0 left-0 right-0 h-[60px] flex [&>*]:my-auto px-2">
      <div
        className={`fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex ${
          isOpen && "ease-in-out duration-300 animate-slide-in-left"
        }`}
      >
        <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
          {/* close button */}
          <div className="flex px-4 pb-2 pt-5">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* products */}
          <div className="mt-2">
            <ul>
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.label} className="space-y-10 px-4 pb-8 pt-10">
                  <div className="border-b border-gray-200">
                    <div className="-mb-px flex">
                      <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                        {category.label}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                    {/* {category.featured.map((item) => ( */}
                    <div key={1} className="group relative text-sm">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          fill
                          src="/icons/new.jpg"
                          alt="product category image"
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <Link
                        href="/"
                        className="mt-6 block font-medium text-gray-900"
                      >
                        new
                      </Link>
                    </div>
                    {/* ))} */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* menus */}
          <div className="space-y-6 border-t border-gray-200 px-4 py-6 flex flex-col align-middle items-center justify-center">
            <div className="inline-flex space-x-2">
              {user ? null : (
                <>
                  <Link
                    onClick={() => closeOnCurrent("/sign-in")}
                    href="/sign-in"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
            {user ? (
              <div className="flex flex-col space-y-5 items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5 leading-none">
                  <span className="flex align-middle items-center justify-start space-x-2 font-semibold">
                    <Cart />
                  </span>
                </div>
                <div className="flex flex-col space-y-0.5 leading-none">
                  <span className="flex align-middle items-center justify-start space-x-2 font-semibold">
                    <Link href="/sell">Seller dashboard</Link>
                  </span>
                </div>
                <div className="flex flex-col space-y-0.5 leading-none">
                  <span className="flex align-middle items-center justify-start space-x-2 font-semibold">
                    <button onClick={signOut}>Log out</button>
                  </span>
                </div>
              </div>
            ) : (
              <div className="inline-flex space-x-2">
                <Link
                  onClick={() => closeOnCurrent("/sign-up")}
                  href="/sign-up"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
