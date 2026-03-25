"use client";

import React from "react";
import { useQuestionnaireSuccessViewModel } from "./questionnaire-success.view-model";
import { QuestionnaireSuccessView } from "./questionnaire-success.view";

export default function QuestionnaireSuccessComponent() {
  const viewModel = useQuestionnaireSuccessViewModel();
  return <QuestionnaireSuccessView {...viewModel} />;
}
