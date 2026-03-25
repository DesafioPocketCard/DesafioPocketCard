"use client";

import React from "react";
import { useProductDetailViewModel } from "./product-detail.view-model";
import { ProductDetailView } from "./product-detail.view";

export default function ProductDetailComponent() {
  const viewModel = useProductDetailViewModel();
  return <ProductDetailView {...viewModel} />;
}
