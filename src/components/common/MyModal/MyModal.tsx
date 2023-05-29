import React, { HTMLAttributes, ReactNode } from "react";
import "./styles.css";

interface MyModal extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  title?: string;
}

export const MyModal = ({ children, isOpen, setIsOpen, ...props }: MyModal) => {
  return isOpen ? (
    <div className="modal" {...props}>
      <div onClick={() => setIsOpen(false)} className="modal__wrapper"></div>
      <div className="modal__content">
        {props.title && (
          <div className="modal__header">
            <h2>{props.title}</h2>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
        )}
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
};
