import styled from "styled-components";

export type StyledInputProps = {
  radius?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const sizeConfig = {
  xs: "0.2em 0.4em",
  sm: "0.4em 0.8em",
  md: "0.5em 1em",
  lg: "1em 2em",
  xl: "1.5em 2.5em",
};

export const StyledInput = styled.input<StyledInputProps>((props) => ({
  color: props.color || "black",
  borderRadius: props.radius || "0.5em",
  padding: props.size ? sizeConfig[props.size] : sizeConfig["md"],
  appearance: "none",
  resize: "none",
  width: "100%",
  display: "block",
  textAlign: "left",
  border: props.disabled ? "none" : "0.0625rem solid rgb(206, 212, 218)",
  backgroundColor: props.disabled ? "inherit" : "rgb(255, 255, 255)",
  transition: "border-color 100ms ease 0s",
  ":focus": {
    outline: "none",
    borderColor: "rgb(34, 139, 230)",
  },
}));
