import RegulationDetailComponent from "@/components/pages/regulations/detail/regulation-detail.component";

interface IProps {
  params: {
    id: string;
  };
}

export default function RegulationPage({ params }: IProps) {
  void params;
  return <RegulationDetailComponent />;
}
