import { MyButton } from "../../common/MyButton/MyButton";
import { userInfo } from "../../../store/auth";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import "./styles.css";

interface IHeaderProps {
  setOpenLoginForm: (arg: boolean) => void;
}

export const Header = observer(({ setOpenLoginForm }: IHeaderProps) => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to={"/diary"} className="logo">
          Logo
        </Link>
        <Link to={"/home"} className="nav-link">
          Home
        </Link>
        <Link to={"/diary"} className="nav-link">
          My Diary
        </Link>
      </nav>
      <div className="header__login-section">
        {userInfo.info.isLogged ? (
          <div className="header__profile">
            <div>{userInfo.info.email}</div>
            <MyButton onClick={() => userInfo.signOut()}>Sign Out</MyButton>
          </div>
        ) : userInfo.info.isFetched ? (
          <div className="header__loading">Loading</div>
        ) : (
          <MyButton onClick={() => setOpenLoginForm(true)}>
            Login/Register
          </MyButton>
        )}
      </div>
    </header>
  );
});
