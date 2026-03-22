import { toast } from "sonner";

export type NotifySeverity = "success" | "error" | "info" | "warning";

function useNotifier() {
  const notify = (message: string, severity: NotifySeverity = "success") => {
    switch (severity) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };

  return notify;
}

export default useNotifier;
