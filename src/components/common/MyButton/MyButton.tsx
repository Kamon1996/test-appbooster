import React, { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./MyButton.styles";
import { StyledButtonProps } from "./MyButton.styles";

type MyButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> &
  StyledButtonProps;

export const MyButton = (props: MyButtonPropsType) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
