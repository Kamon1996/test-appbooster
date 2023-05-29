import React, { useState } from "react";
import { MyButton } from "../../common/MyButton/MyButton";
import { AuthFormState } from "../../../types/types";
import { userInfo } from "../../../store/auth";
import { MyInput } from "../../common/MyInput/MyInput";

interface ISignUp {
  setFormState: (formState: AuthFormState) => void;
  setLoginFormOpen: (arg: boolean) => void;
}

export const SignUp = ({ setFormState, setLoginFormOpen }: ISignUp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await userInfo.signUp({ email, password });
    res.user && setLoginFormOpen(false);
  };

  return (
    <main>
      <section>
        <div>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="email-address">Email address</label>
                <MyInput
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <MyInput
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <MyButton type="submit" bg="green">
                Sign up
              </MyButton>
            </form>

            <p>
              Already have an account?
              <MyButton onClick={() => setFormState("sign-in")}>
                Sign in
              </MyButton>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
