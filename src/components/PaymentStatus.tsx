"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface IPaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}

const PaymentStatus = ({
  orderEmail,
  orderId,
  isPaid,
}: IPaymentStatusProps) => {
  const router = useRouter();
  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000), // seconds
    }
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);

  return (
    <div className="mt-16 grid grid-col-2 gap-x-4 text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Shipping to</p>
        <p>{orderEmail}</p>
      </div>
      <div className="mt-3 inline-flex space-x-2">
        <p className="font-medium text-gray-900">Order Status:</p>
        {/* <p>{isPaid ? "Payment successful" : "Pending payment"}</p> */}
        <p>
          {isPaid ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 animate-pulse border">
              Payment successful
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 animate-pulse border">
              Pending payment
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PaymentStatus;
