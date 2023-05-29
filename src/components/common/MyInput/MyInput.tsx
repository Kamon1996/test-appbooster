import React, { InputHTMLAttributes } from "react";
import { StyledInput, StyledInputProps } from "./MyInput.styles";

type MyInputPropsType = InputHTMLAttributes<HTMLInputElement> &
  StyledInputProps;

export const MyInput = (props: MyInputPropsType) => {
  return <StyledInput {...props} />;
};
