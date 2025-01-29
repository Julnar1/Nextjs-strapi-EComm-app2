"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.push("/products")}
        className="btn btn-dark text-start mb-2"
      >
        Continue Shopping
      </button>
    </div>
  );
}
