import { LoadingContext } from "@/contexts/LoadingContext";
import { useContext } from "react";

function useLoading() {
  const [, setLoading] = useContext(LoadingContext);
  return setLoading;
}

export default useLoading;
