import React from "react";
import Image from "next/image";
import { ArrowLeft, Trash2, ShoppingBag, RefreshCw, Wallet } from "lucide-react";
import { useCartViewModel } from "./cart.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";

type Props = ReturnType<typeof useCartViewModel>;

export function CartView({ items, totalCart, saldoUsuario, isLoading, isError, isRemoving, isProcessing, handleRemove, handleCheckout, goBack, goToStore, refetch }: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goBack} className="bg-white/20 text-white rounded-xl">
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Minha Sacola</h1>
          </div>
          <div className="flex items-center gap-4 bg-white/10 px-5 py-3 rounded-2xl border border-white/20 w-fit">
            <div className="w-9 h-9 rounded-[10px] bg-white/20 flex items-center justify-center text-white">
              <Wallet size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-semibold text-white/70 tracking-wide">Seu Saldo</span>
              <span className="text-base font-bold text-white">{saldoUsuario} pontos</span>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
            <RefreshCw className="animate-spin text-primary-500" size={40} />
            <p>Carregando sacola...</p>
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
            <p>Erro ao carregar os itens.</p>
            <Button onClick={() => refetch()} size="sm">Tentar novamente</Button>
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-0">
            <ShoppingBag size={64} className="text-gray-200" />
            <h3 className="text-xl font-bold text-gray-700 mt-6">Sua sacola está vazia</h3>
            <p className="text-[15px] text-gray-500 mt-2">Que tal escolher alguns prêmios agora?</p>
            <Button onClick={goToStore} variant="primary" className="mt-4">Ir para a loja</Button>
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {items.map((item: any) => (
                <div key={item.id_sacola_item} className="flex gap-4 p-5 bg-white rounded-[20px] border border-gray-200">
                  <div className="w-[70px] h-[70px] bg-gray-50 rounded-xl p-2 flex items-center justify-center shrink-0">
                    <Image src={item.img_premio} alt={item.nome_premio} width={60} height={60} className="object-contain" unoptimized />
                  </div>
                  <div className="flex flex-col justify-center gap-1 flex-1">
                    <h4 className="text-[15px] font-bold text-gray-900">{item.nome_premio}</h4>
                    <p className="text-[13px] font-semibold text-primary-600">
                      {item.pontos_custo_unitario} pts
                      {item.quantidade > 1 && <span className="text-gray-500 font-normal"> (x{item.quantidade})</span>}
                    </p>
                    <button
                      className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 mt-2 border-none bg-none p-0 cursor-pointer w-fit disabled:opacity-50"
                      onClick={() => handleRemove(item.id_sacola_item)}
                      disabled={isRemoving}
                    >
                      <Trash2 size={14} /> Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col gap-4 shadow-md">
              <div className="flex justify-between text-[15px] text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-700">{totalCart} pts</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-gray-900">Total do Resgate</span>
                <span className="text-2xl font-extrabold text-primary-600">{totalCart} pts</span>
              </div>
              <div className="flex flex-col gap-3">
                <Button fullWidth size="lg" onClick={handleCheckout} isLoading={isProcessing} disabled={totalCart > saldoUsuario}>
                  {totalCart > saldoUsuario ? "Saldo Insuficiente" : "Finalizar Resgate"}
                </Button>
                <Button fullWidth variant="outline" onClick={goToStore}>Continuar Comprando</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RadialWrapper>
  );
}
