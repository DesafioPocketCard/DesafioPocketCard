import { ButtonProps } from "./button.model";

export function useButtonViewModel(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    isLoading = false,
    fullWidth = false,
    disabled,
    ...rest
  } = props;

  const isButtonDisabled = disabled || isLoading;

  return {
    variant,
    size,
    isLoading,
    isButtonDisabled,
    fullWidth,
    ...rest,
  };
}
