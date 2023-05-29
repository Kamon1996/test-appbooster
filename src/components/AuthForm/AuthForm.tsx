import { useState } from "react";
import { AuthFormState } from "../../types/types";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

interface IAuthForm {
  setLoginFormOpen: (arg: boolean) => void;
}

export const AuthForm = ({ setLoginFormOpen }: IAuthForm) => {
  const [authFormState, setAuthFormState] = useState<AuthFormState>("sign-in");
  return (
    <>
      {authFormState === "sign-in" ? (
        <SignIn
          setFormState={setAuthFormState}
          setLoginFormOpen={setLoginFormOpen}
        />
      ) : (
        <SignUp
          setFormState={setAuthFormState}
          setLoginFormOpen={setLoginFormOpen}
        />
      )}
    </>
  );
};
