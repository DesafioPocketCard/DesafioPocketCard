import React from "react";
import { ArrowLeft, CheckCircle2, RefreshCw, FileText } from "lucide-react";
import { useRegulationDetailViewModel } from "./regulation-detail.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";

type Props = ReturnType<typeof useRegulationDetailViewModel>;

export function RegulationDetailView({
  campaign,
  regulation,
  isLoading,
  isError,
  isAccepted,
  isAccepting,
  handleAccept,
  termsChecked,
  setTermsChecked,
  goBack,
}: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goBack} className="bg-white/20 text-white rounded-xl">
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Regulamento</h1>
          </div>
          {campaign && (
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-white/90">{campaign.nome_campanha}</h2>
              <div className="bg-white/15 px-3 py-1 rounded-full w-fit text-xs font-bold text-white border border-white/20">
                Meta: {campaign.valor_meta} pts
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Corpo do regulamento */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
            <RefreshCw className="animate-spin text-primary-500" size={40} />
            <p>Carregando regulamento...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
            <p>Não foi possível carregar o texto do regulamento.</p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 min-h-[200px] shadow-sm">
            {regulation ? (
              <div
                className="text-[15px] text-gray-600 leading-[1.7] [&_h1]:text-gray-900 [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-gray-900 [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-gray-900 [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:pl-6 [&_ol]:mb-4"
                dangerouslySetInnerHTML={{ __html: regulation }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-400">
                <FileText size={40} className="text-gray-300" />
                <p className="text-sm text-center font-medium">
                  O texto do regulamento não está disponível no momento.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Ações — sempre visíveis após o carregamento */}
        {!isLoading && !isError && (
          <div className="flex flex-col gap-3">
            {isAccepted ? (
              <div className="flex items-center justify-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl font-semibold text-[15px] border border-emerald-200">
                <CheckCircle2 size={20} />
                <span>Você já aceitou este regulamento.</span>
              </div>
            ) : (
              <>
                {/* Checkbox de aceite */}
                <label className="flex items-start gap-3 cursor-pointer bg-gray-50 border border-gray-200 rounded-2xl p-4 select-none">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                      className="peer sr-only"
                      id="terms-checkbox"
                    />
                    <div className="w-5 h-5 rounded-md border-2 border-gray-300 bg-white peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                      {termsChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 leading-snug font-medium">
                    Li e aceito os termos e condições do regulamento desta campanha.
                  </span>
                </label>

                <Button
                  onClick={handleAccept}
                  isLoading={isAccepting}
                  fullWidth
                  size="lg"
                  disabled={!termsChecked}
                >
                  Aceitar e continuar
                </Button>
              </>
            )}

            <Button variant="ghost" onClick={goBack} fullWidth className="mt-1">
              Voltar
            </Button>
          </div>
        )}
      </div>
    </RadialWrapper>
  );
}
