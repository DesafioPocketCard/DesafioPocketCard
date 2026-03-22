"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {  useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShoppingBag, RefreshCw } from "lucide-react";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import { ProductCard } from "@/components/pages/rescue-points/components/product-card/product-card.view";
import { GiftService } from "@/resources/services/gift/gift.service";
import { CartService } from "@/resources/services/cart/cart.service";
import { GIFT_QUERY_KEYS } from "@/resources/services/gift/gift.query-key";
import { APP_ROUTES } from "@/routes/routes";

type Props = {
  params: {
    id: string;
  };
};

export default function CategoryPage({ params: { id } }: Props) {
  const router = useRouter();

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.get(),
  });

  const { data: giftsData, isLoading: isLoadingGifts } = useQuery({
    queryKey: GIFT_QUERY_KEYS.list(id),
    queryFn: () => GiftService.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const itemsInCart = (cartData as any)?.data?.sacola?.itens?.length || 0;
  const userPoints = (cartData as any)?.data?.total_pontos_usuario || 0;
  const gifts = giftsData?.data || [];

  const goBack = () => router.back();
  const goToCart = () => router.push(APP_ROUTES.CART);
  const handleProductClick = (productId: string) => {
    router.push(APP_ROUTES.PRODUCT_DETAIL(productId));
  };

  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goBack} className="bg-white/20 text-white rounded-xl">
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Resgate de Prêmios</h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white/10 px-5 py-3 rounded-2xl border border-white/20 w-fit">
            <div className="w-9 h-9 rounded-[10px] bg-white/20 flex items-center justify-center text-white">
              <ShoppingBag size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-semibold text-white/70 tracking-wide">Seu Saldo</span>
              <span className="text-base font-bold text-white">{userPoints} pontos</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goToCart} className="bg-white/20 text-white rounded-xl relative">
              <ShoppingBag size={24} />
              {itemsInCart > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemsInCart}
                </span>
              )}
            </Button>
            <span className="text-sm text-white/80">Itens na sacola: {itemsInCart}</span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {isLoadingGifts && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
            <RefreshCw className="animate-spin text-primary-500" size={40} />
            <p>Carregando prêmios...</p>
          </div>
        )}

        {!isLoadingGifts && gifts.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {gifts.map((product) => (
              <ProductCard 
                key={product.id_premio} 
                product={product} 
                onClick={() => handleProductClick(product.id_premio)} 
              />
            ))}
          </div>
        )}

        {!isLoadingGifts && gifts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-400 text-center">
            <p>Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </RadialWrapper>
  );
}
