import { redirect } from "next/navigation";

interface PageProps {
  params: {
    category: string;
  };
}

export default function LegacyCategoryRedirectPage({ params }: PageProps) {
  const decoded = decodeURIComponent(params.category || "");

  if (/^\d+$/.test(decoded)) {
    redirect(`/rescue-points/category/${decoded}`);
  }

  redirect("/rescue-points");
}
