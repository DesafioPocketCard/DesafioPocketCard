import React from "react";
import { ArrowLeft, ShoppingBag, RefreshCw } from "lucide-react";
import { useProductDetailViewModel } from "./product-detail.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";

type Props = ReturnType<typeof useProductDetailViewModel>;

export function ProductDetailView({
  product,
  isLoading,
  isError,
  isAdding,
  addToCart,
  goBack,
  goToCart,
}: Props) {
  const imageUrl =
    typeof product?.nome_arquivo === "string" ? product.nome_arquivo.trim() : "";
  const hasImage = imageUrl.length > 0;
  const [imageSize, setImageSize] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  React.useEffect(() => {
    if (!hasImage) {
      setImageSize(null);
      return;
    }

    const img = new window.Image();
    img.decoding = "async";
    img.src = imageUrl;
    img.onload = () => {
      const width = img.naturalWidth || 1;
      const height = img.naturalHeight || 1;
      setImageSize({ width, height });
    };
    img.onerror = () => setImageSize(null);
  }, [hasImage, imageUrl]);

  return (
    <RadialWrapper
      headerClassName={hasImage ? "p-0 max-w-none mx-0 w-full" : undefined}
      header={
        hasImage ? (
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: imageSize
                ? `${imageSize.width} / ${imageSize.height}`
                : "1 / 1",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/50" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="bg-black/30 text-white rounded-xl backdrop-blur-md border border-white/15"
              >
                <ArrowLeft size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToCart}
                className="bg-black/30 text-white rounded-xl backdrop-blur-md border border-white/15"
              >
                <ShoppingBag size={24} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="bg-white/20 text-white rounded-xl"
              >
                <ArrowLeft size={24} />
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToCart}
                  className="bg-white/20 text-white rounded-xl"
                >
                  <ShoppingBag size={24} />
                </Button>
              </div>
            </div>
          </div>
        )
      }
    >
      <div className="flex flex-col">
        {isLoading && (
          <div className="flex justify-center py-12">
            <RefreshCw className="animate-spin text-primary-500" size={32} />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <p className="text-gray-500">Não foi possível carregar os detalhes do produto.</p>
            <Button onClick={goBack} variant="outline">Voltar</Button>
          </div>
        )}

        {product && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                {product.nome_premio}
              </h1>
              <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-base font-bold whitespace-nowrap shadow-sm border border-primary-200">
                {product.valor_pontos} pts
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-gray-800">Descrição</h3>
              <div
                className="text-[15px] text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1"
                dangerouslySetInnerHTML={{
                  __html: product.descricao_premio || "",
                }}
              />
            </div>

            <div className="mt-4 sticky bottom-4">
              <Button
                onClick={addToCart}
                isLoading={isAdding}
                fullWidth
                size="lg"
                leftIcon={<ShoppingBag size={20} />}
                className="shadow-xl"
              >
                Adicionar à sacola
              </Button>
            </div>
          </div>
        )}
      </div>
    </RadialWrapper>
  );
}
