import React from "react";
import { ArrowLeft, ShoppingBag, RefreshCw, Star } from "lucide-react";
import { useRescuePointsViewModel } from "./rescue-points.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import { ProductCard } from "./components/product-card/product-card.view";
import { cn } from "@/lib/utils";

type Props = ReturnType<typeof useRescuePointsViewModel>;

export function RescuePointsView({ categories, featuredGifts, gifts, selectedCategory, setSelectedCategory, isLoading, handleProductClick, goToCart, goBack }: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={goBack} className="bg-white/20 text-white rounded-xl">
                <ArrowLeft size={24} />
              </Button>
              <h1 className="text-2xl font-bold text-white">Resgate de Prêmios</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={goToCart} className="bg-white/20 text-white rounded-xl">
              <ShoppingBag size={24} />
            </Button>
          </div>
          <p className="text-sm text-white/80">Use seus pontos para resgatar prêmios incríveis.</p>

          <div className="overflow-x-auto -mx-2 px-2 pb-1">
            <div className="flex gap-2">
              <button
                className={cn("px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border",
                  !selectedCategory ? "bg-white text-primary-700 border-white" : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                )}
                onClick={() => setSelectedCategory(null)}
              >
                Destaques
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id_grupo_premio}
                  className={cn("px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border",
                    selectedCategory === cat.id_grupo_premio ? "bg-white text-primary-700 border-white" : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                  )}
                  onClick={() => setSelectedCategory(cat.id_grupo_premio)}
                >
                  {cat.nome_grupo_premio}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
            <RefreshCw className="animate-spin text-primary-500" size={40} />
            <p>Carregando prêmios...</p>
          </div>
        )}

        {!isLoading && !selectedCategory && featuredGifts.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-yellow-500" />
              <h3 className="text-lg font-bold text-gray-800">Produtos em Destaque</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {featuredGifts.map((product) => (
                <ProductCard key={product.id_premio} product={product} onClick={() => handleProductClick(product.id_premio)} />
              ))}
            </div>
          </div>
        )}

        {!isLoading && selectedCategory && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {gifts.map((product) => (
              <ProductCard key={product.id_premio} product={product} onClick={() => handleProductClick(product.id_premio)} />
            ))}
          </div>
        )}

        {!isLoading && selectedCategory && gifts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-400 text-center">
            <p>Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </RadialWrapper>
  );
}
