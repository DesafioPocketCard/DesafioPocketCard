"use client";

import React from "react";
import { useQuestionnaireViewModel } from "./questionnaire.view-model";
import { QuestionnaireView } from "./questionnaire.view";

export default function QuestionnaireComponent() {
  const viewModel = useQuestionnaireViewModel();
  return <QuestionnaireView {...viewModel} />;
}
