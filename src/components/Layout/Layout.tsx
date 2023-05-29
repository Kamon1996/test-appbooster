import { useEffect, useState } from "react";
import { Header } from "./Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { MyModal } from "../common/MyModal/MyModal";
import { AuthForm } from "../AuthForm/AuthForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../main";
import { userInfo } from "../../store/auth";
import "./styles.css";

export const Layout = () => {
  const [loginFormIsOpen, setLoginFormOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      if (!currentuser) return (userInfo.info.isFetched = false);
      const { uid, email } = currentuser;
      userInfo.setUserData({ email, uid });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="layout">
      <Header setOpenLoginForm={setLoginFormOpen} />
      <Outlet />
      <MyModal
        setIsOpen={setLoginFormOpen}
        isOpen={loginFormIsOpen}
        children={<AuthForm setLoginFormOpen={setLoginFormOpen} />}
        title="Login / Register"
      />
    </div>
  );
};
