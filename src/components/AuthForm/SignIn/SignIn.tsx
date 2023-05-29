import { useState } from "react";
import { MyButton } from "../../common/MyButton/MyButton";
import { AuthFormState } from "../../../types/types";
import { userInfo } from "../../../store/auth";
import { MyInput } from "../../common/MyInput/MyInput";

interface ISignIn {
  setFormState: (formState: AuthFormState) => void;
  setLoginFormOpen: (arg: boolean) => void;
}

const INIT_LOGIN_STATE = {
  email: "",
  password: "",
};

export const SignIn = ({ setFormState, setLoginFormOpen }: ISignIn) => {
  const [loginState, setLoginState] = useState(INIT_LOGIN_STATE);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginState.email || !loginState.password) return;
    const res = await userInfo.signIn(loginState);
    res.user && setLoginFormOpen(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email-address">Email address</label>
          <MyInput
            type="email"
            name="email"
            value={loginState.email}
            onChange={onChange}
            required
            placeholder="Email address"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <MyInput
            name="password"
            type="password"
            value={loginState.password}
            onChange={onChange}
            required
            placeholder="Password"
          />
        </div>

        <MyButton type="submit" bg="green">
          Sign In
        </MyButton>
      </form>

      <p>
        Dosen't have an account?
        <MyButton onClick={() => setFormState("sign-up")}>Sign up</MyButton>
      </p>
    </div>
  );
};
