import React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingBag,
  Copy,
  X,
  ExternalLink,
  RefreshCw,
  Trophy,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMyRewardsViewModel } from "./my-rewards.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import { motion, AnimatePresence } from "framer-motion";

type Props = ReturnType<typeof useMyRewardsViewModel>;

export function MyRewardsView({
  rewards,
  itemsInCart,
  userPoints,
  isLoadingRewards,
  isErrorRewards,
  selectedReward,
  handleCopy,
  goBack,
  goToCart,
  openDetail,
  closeDetail,
  refetchRewards,
}: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="bg-white/20 text-white rounded-xl"
              >
                <ArrowLeft size={24} />
              </Button>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white">Meus Prêmios</h1>
                <span className="text-sm text-white/80">
                  {userPoints} pontos disponíveis
                </span>
              </div>
            </div>
            <div className="header-right">
              <button
                className="relative w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-white border-none cursor-pointer"
                onClick={goToCart}
              >
                <ShoppingBag size={24} />
                {itemsInCart > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-primary-600">
                    {itemsInCart}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col">
        {isLoadingRewards && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
            <RefreshCw className="animate-spin text-primary-500" size={40} />
            <p>Buscando seu histórico...</p>
          </div>
        )}

        {isErrorRewards && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center text-gray-500">
            <p>Erro ao carregar seus prêmios.</p>
            <Button onClick={() => refetchRewards()} size="sm">
              Tentar novamente
            </Button>
          </div>
        )}

        {!isLoadingRewards && rewards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center gap-3">
            <Trophy size={64} className="text-gray-200" />
            <h3 className="text-xl font-bold text-gray-700">Nenhum prêmio ainda</h3>
            <p className="text-[15px] text-gray-500 max-w-[280px]">
              Seus resgates aparecerão aqui assim que você os realizar.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {rewards.map((reward) => (
            <button
              key={reward.id_premio}
              className="bg-white p-4 rounded-[20px] border border-gray-200 flex items-center gap-4 text-left transition-transform active:scale-[0.98] cursor-pointer"
              onClick={() => openDetail(reward)}
            >
              <div className="w-[60px] h-[60px] bg-gray-50 rounded-xl p-2 flex items-center justify-center shrink-0">
                <Image
                  src={reward.img_premio}
                  alt={reward.nome}
                  width={60}
                  height={60}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-[15px] font-bold text-gray-900">{reward.nome}</h4>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Calendar size={12} />
                  <span>
                    {format(parseISO(reward.data_resgate), "dd MMM yyyy", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Reward Detail Modal */}
        <AnimatePresence>
          {selectedReward && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs z-100"
                onClick={closeDetail}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 pb-10 z-101 max-w-[500px] mx-auto shadow-[-10px_0_25px_-5px_rgba(0,0,0,0.1)]"
              >
                <div className="flex flex-col items-center mb-6 relative">
                  <div className="w-10 h-1 bg-gray-200 rounded-full mb-4" />
                  <button
                    className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                    onClick={closeDetail}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-5">
                  <div className="w-32 h-32 bg-gray-50 rounded-[20px] p-4 flex items-center justify-center shadow-inner">
                    <Image
                      src={selectedReward.img_premio}
                      alt={selectedReward.nome}
                      width={100}
                      height={100}
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-extrabold text-gray-900">{selectedReward.nome}</h3>
                    <div className="text-sm font-medium text-gray-400 mt-1">
                      Resgatado em{" "}
                      {format(
                        parseISO(selectedReward.data_resgate),
                        "dd/MM/yyyy",
                      )}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-100" />

                  {selectedReward.codigo_voucher && (
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-[11px] uppercase font-bold text-gray-400 tracking-widest">
                        Código / Voucher
                      </span>
                      <div className="flex gap-3">
                        <div className="flex-1 bg-gray-50 p-3.5 border border-gray-200 rounded-xl font-mono text-base font-bold text-gray-900 shadow-inner">
                          {selectedReward.codigo_voucher}
                        </div>
                        <button
                          className="w-12 bg-primary-50 text-primary-600 border border-primary-100 rounded-xl flex items-center justify-center cursor-pointer transition-colors hover:bg-primary-100"
                          onClick={() =>
                            handleCopy(selectedReward.codigo_voucher!)
                          }
                        >
                          <Copy size={18} />
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedReward.serial_numero && (
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-[11px] uppercase font-bold text-gray-400 tracking-widest">Série / Serial</span>
                      <div className="text-[15px] font-semibold text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                        {selectedReward.serial_numero}
                      </div>
                    </div>
                  )}

                  {selectedReward.instrucao_premio && (
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-[11px] uppercase font-bold text-gray-400 tracking-widest">Instruções</span>
                      <div
                        className="text-sm text-gray-600 leading-relaxed bg-amber-50 p-4 rounded-xl border border-amber-100"
                        dangerouslySetInnerHTML={{
                          __html: selectedReward.instrucao_premio,
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="w-full mt-8 flex flex-col gap-3">
                  {selectedReward.url_premio && (
                    <Button
                      as="a"
                      href={selectedReward.url_premio}
                      target="_blank"
                      fullWidth
                      leftIcon={<ExternalLink size={18} />}
                    >
                      Acessar no site
                    </Button>
                  )}
                  <Button variant="ghost" onClick={closeDetail} fullWidth>
                    Fechar
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </RadialWrapper>
  );
}
