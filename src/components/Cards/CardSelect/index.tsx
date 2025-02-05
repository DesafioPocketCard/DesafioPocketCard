import { Typography } from "@mui/material";
import { CardContainer, CardOption } from "./styles";
import { useState } from "react";
import { CheckBox } from "@mui/icons-material";

export default function CardSelect<T>({
  onChange,
  title,
  optionLabelKey,
  optionValueKey,
  options,
}: ICardSelectProps<T>) {
  const [selected, setSelected] = useState<T>();

  return (
    <CardContainer>
      {title ?? null}
      {options.map((option, index) => (
        <CardOption
          selected={selected?.[optionValueKey] === option[optionValueKey]}
          key={option[optionValueKey] as string}
          onClick={() => {
            setSelected(option);
            onChange(option);
          }}
        >
          <Typography>{`${String.fromCharCode(97 + index)}) ${option[optionLabelKey]}`}</Typography>
          {selected?.[optionValueKey] === option[optionValueKey] && (
            <CheckBox htmlColor="white" />
          )}
        </CardOption>
      ))}
    </CardContainer>
  );
}
