import React from "react";
import Image from "next/image";
import { ShoppingBag, ImageOff } from "lucide-react";
import { IGift } from "@/resources/services/gift/gift.type";

interface Props {
  product: IGift;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: Props) {
  const imageSrc = typeof product.nome_arquivo === "string" ? product.nome_arquivo.trim() : "";
  const hasImage = imageSrc.length > 0;

  return (
    <div
      className="flex flex-col bg-white rounded-[20px] border border-gray-200 overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary-300 shadow-sm"
      onClick={onClick}
    >
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center">
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={product.nome_premio}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
            <div className="size-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center">
              <ImageOff size={22} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Sem imagem</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h4 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-10">
          {product.nome_premio}
        </h4>
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-primary-600">{product.valor_pontos} pts</span>
          <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
            <ShoppingBag size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
