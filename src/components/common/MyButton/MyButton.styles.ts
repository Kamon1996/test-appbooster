import styled from "styled-components";

export type StyledButtonProps = {
  bg?: string;
  fullWidth?: boolean;
  radius?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const StyledButton = styled.button<StyledButtonProps>((props) => ({
  color: props.color || "white",
  borderRadius: props.radius || 2,
  width: props.fullWidth ? "100%" : "",
  backgroundColor: props.disabled ? "gray" : props.bg || "tomato",
  cursor: "pointer",
  padding: "2px 10px",
}));
