import { makeAutoObservable } from "mobx";
import { UserInfo } from "../types/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../main";
import { entries } from "./entries";

interface ICredentials {
  email: string;
  password: string;
}

class User {
  info: UserInfo = {
    email: "",
    uid: "",
    isLogged: false,
    isFetched: true,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUserData = async ({
    email,
    uid,
  }: {
    email: string | null;
    uid: string;
  }) => {
    this.info = {
      email,
      uid,
      isLogged: true,
      isFetched: false,
    };
  };

  signUp = ({ email, password }: ICredentials) => {
    this.info.isFetched = true;
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { uid, email } = userCredential.user;
        this.info = {
          email,
          uid,
          isLogged: true,
          isFetched: false,
        };
        localStorage.setItem("uid", uid);
        return userCredential;
      })
      .catch((error) => {
        this.info.isFetched = false;
        return error.message;
      });
  };

  signIn = async ({ email, password }: ICredentials) => {
    this.info.isFetched = true;
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { uid, email } = userCredential.user;
        this.info = {
          email,
          uid,
          isLogged: true,
          isFetched: false,
        };
        localStorage.setItem("uid", uid);
        return userCredential;
      })
      .catch((error) => {
        this.info.isFetched = false;
        return error.message;
      });
  };

  signOut = async () => {
    signOut(auth).then(() => {
      this.info = {
        email: "",
        uid: "",
        isLogged: false,
        isFetched: false,
      };
      localStorage.removeItem("uid");
      entries.data = [];
    });
  };
}

export const userInfo = new User();
