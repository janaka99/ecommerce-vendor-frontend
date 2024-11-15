import React, { ReactNode } from "react";
import {
  useController,
  Control,
  FieldValues,
  Path,
  UseControllerReturn,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  render: (fields: UseControllerReturn<T>) => ReactNode;
};

const FormField = <T extends FieldValues>({
  control,
  name,
  render,
}: Props<T>) => {
  const { field, fieldState, formState } = useController({
    name,
    control,
  });

  return render({ field, fieldState, formState });
};

export default FormField;
