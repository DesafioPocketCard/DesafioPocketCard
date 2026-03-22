import { ArrowLeft, ChevronRight } from "lucide-react";
import { useQuestionnaireViewModel } from "./questionnaire.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import { CardSelect } from "@/components/shared/fields/card-select/card-select.view";
import { motion, AnimatePresence } from "framer-motion";

type Props = ReturnType<typeof useQuestionnaireViewModel>;

export function QuestionnaireView({
  currentQuestion,
  currentStep,
  totalSteps,
  selectedAnswer,
  setSelectedAnswer,
  handleNext,
  goBack,
  isLastStep,
}: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="bg-white/20 text-white rounded-xl"
            >
              <ArrowLeft size={24} />
            </Button>
            <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
              Pergunta {currentStep + 1} de {totalSteps}
            </div>
          </div>
          <h1 className="text-2xl font-black text-white px-1">Teste de Conhecimento</h1>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-xl">
          <iframe
            src={`${currentQuestion.videoURL}?title=0&byline=0&portrait=0&badge=0&autopause=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            className="w-full h-full border-none"
            title="Vídeo do Desafio"
          ></iframe>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="flex flex-col gap-6"
          >
            <CardSelect
              title={currentQuestion.question}
              options={currentQuestion.answers}
              value={selectedAnswer}
              onChange={setSelectedAnswer}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pt-4 sticky bottom-4">
          <Button
            fullWidth
            size="lg"
            onClick={handleNext}
            disabled={!selectedAnswer}
            rightIcon={!isLastStep && <ChevronRight size={20} />}
            className="shadow-xl"
          >
            {isLastStep ? "Finalizar Desafio" : "Próxima Pergunta"}
          </Button>
        </div>
      </div>
    </RadialWrapper>
  );
}
