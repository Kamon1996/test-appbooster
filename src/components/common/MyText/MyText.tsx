import React, { HtmlHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

export type StyledTextProps = {
  order?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  transform?:
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "none"
    | "capitalize"
    | "full-size-kana"
    | "full-width"
    | "lowercase"
    | "uppercase";
  size?: number | string;
  align?:
    | "left"
    | "right"
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "center"
    | "end"
    | "start"
    | "justify"
    | "match-parent";
};

type MyTextPropsType = HtmlHTMLAttributes<HTMLTitleElement> & StyledTextProps;

const Text = ({
  order: Variant,
  children,
  className,
}: PropsWithChildren<MyTextPropsType>) => {
  switch (Variant) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return <Variant className={className}>{children}</Variant>;
    default:
      return <p className={className}>{children}</p>;
  }
};

export const MyText = styled(Text)<MyTextPropsType>((props) => ({
  fontSize: props.size,
  textTransform: props.transform,
  textAlign: props.align,
}));
