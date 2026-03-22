"use client";

import React from "react";
import { useCartViewModel } from "./cart.view-model";
import { CartView } from "./cart.view";

export default function CartComponent() {
  const viewModel = useCartViewModel();
  return <CartView {...viewModel} />;
}
