import React, { useCallback, useContext, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import { LOGIN_ROUTE, PUBLIC_IMAGE } from "../../constants";
import { useNavigate } from "react-router-dom";
import { publicRoutes, RouteNames } from "../../routes/routes";
import { observer } from "mobx-react-lite";
import formStore from "../../stores/formStore";
import { useMetaMask } from "../../hooks/useMetaMask";
import { Context } from "../../..";

const Header = () => {
  const mainLogoPath = PUBLIC_IMAGE + "main-logo.svg";
  const navigate = useNavigate();
  const burgerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { provider, account, chainId, error, connect } = useMetaMask();
  const { userStore } = useContext(Context);

  const toggleMenu = useCallback(() => {
    if (document.body.style.overflowY === "hidden") {
      document.body.style.overflowY = "";
      document.documentElement.style.overflowY = "";
    } else {
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
    }
    burgerRef.current?.classList.toggle("active");
    menuRef.current?.classList.toggle("open");
    document.body.classList.toggle("active");
  }, []);

  const closeMenu = useCallback(() => {
    document.body.style.overflowY = "";
    document.documentElement.style.overflowY = "";
    burgerRef.current?.classList.remove("active");
    menuRef.current?.classList.remove("open");
    document.body.classList.remove("active");
  }, []);

  useEffect(() => {
    if (burgerRef.current) {
      burgerRef.current.addEventListener("click", toggleMenu);
      return () => {
        burgerRef.current?.removeEventListener("click", toggleMenu);
      };
    }
  }, [toggleMenu]);

  const handleLogout = () => {
    userStore.logout();
    navigate(LOGIN_ROUTE, { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__inner}>
          <nav className={styles.menu}>
            <div className={styles.burger} ref={burgerRef}>
              <span></span>
            </div>
            <div className={styles.menu__listHeader} ref={menuRef}>
              <li className={styles.menu__listItem}>
                <a onClick={handleLogout} className={styles.menu__listLink}>
                  Exit
                </a>
              </li>
            </div>
            {/* <div className={styles.menu__listItemLine}></div>
            <li className={`${styles.menu__listItem} ${styles.En}`}>
              <a href="#" className={styles.menu__listLink}>
                En
              </a>
            </li> */}
            {/* <li className={styles.menu__listItem}>
              <a onClick={connect} className={styles.menu__listLink}>
                {account ? (
                  <>
                    <p>
                      Account is connected: <b>{account}</b>
                    </p>
                    <p>
                      Chain ID: <b>{chainId}</b>
                    </p>
                    <button
                      onClick={() =>
                        provider && provider.send("eth_requestAccounts", [])
                      }
                    >
                      Reconnct
                    </button>
                  </>
                ) : (
                  <button onClick={connect}>
                    Connect an account to metamask
                  </button>
                )}
              </a>
            </li> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
