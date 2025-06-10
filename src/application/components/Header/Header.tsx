import React, { useCallback, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import { PUBLIC_IMAGE } from "../../constants";
import { useNavigate } from "react-router-dom";
import { publicRoutes, RouteNames } from "../../routes/routes";
import { observer } from "mobx-react-lite";
import poolsStore from "../../stores/poolsStore";
import formStore from "../../stores/formStore";
import { useMetaMask } from "../../hooks/useMetaMask";

const Header = () => {
  const mainLogoPath = PUBLIC_IMAGE + "main-logo.svg";
  const navigate = useNavigate();
  const burgerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { provider, account, chainId, error, connect } = useMetaMask();

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

  const handleLinkClick = (route: string) => {
    closeMenu();
    navigate(route);
    if (formStore.formData.rememberData === "on") {
      window.location.reload();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__inner}>
          <a href="/">
            <img src={mainLogoPath} alt="mainImage" />
          </a>
          <nav className={styles.menu}>
            <div className={styles.burger} ref={burgerRef}>
              <span></span>
            </div>
            <div className={styles.menu__listHeader} ref={menuRef}>
              <li className={styles.menu__listItem}>
                <a
                  onClick={() => {
                    navigate(RouteNames.EXCHANGER_ROUTE);
                    handleLinkClick(RouteNames.EXCHANGER_ROUTE);
                    formStore.setDataValid(undefined);
                    poolsStore.setIsSubscribe(undefined);
                    poolsStore.setIsConfirm(undefined);
                  }}
                  className={styles.menu__listLink}
                >
                  Exchanger
                </a>
              </li>
              <li className={styles.menu__listItem}>
                <a
                  onClick={() => {
                    poolsStore.setIsSubscribe(false);
                  }}
                  href="https://alfa-crypto.com/coming_soon"
                  className={styles.menu__listLink}
                >
                  Debit cards
                </a>
              </li>
              <li className={styles.menu__listItem}>
                <a
                  href="https://alfa-crypto.com/coming_soon"
                  className={styles.menu__listLink}
                >
                  Bots
                </a>
              </li>
              <li className={styles.menu__listItem}>
                <a
                  onClick={() => {
                    navigate(RouteNames.POOLS_ROUTE);
                    handleLinkClick(RouteNames.POOLS_ROUTE);
                    formStore.setDataValid(undefined);
                    poolsStore.setIsSubscribe(undefined);
                  }}
                  className={styles.menu__listLink}
                >
                  Pools
                </a>
              </li>
              <li className={styles.menu__listItem}>
                <a
                  href="https://alfa-crypto.com/coming_soon"
                  className={styles.menu__listLink}
                >
                  Credits
                </a>
              </li>
              <li className={styles.menu__listItem}>
                <a
                  onClick={() => handleLinkClick(RouteNames.EXCHANGER_ROUTE)}
                  className={styles.menu__listLink}
                  href="https://alfa-crypto.com/sheepy"
                >
                  Sheepy
                  <div
                    className={`${styles.menu__dropdownContent} ${styles.dropdown__sheepy}`}
                  >
                    <div className={styles.menu__dropdownWrapper}>
                      <img
                        src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                        alt=""
                      />
                      <a
                        onClick={() =>
                          handleLinkClick(RouteNames.EXCHANGER_ROUTE)
                        }
                        href="https://alfa-crypto.com/sheepy"
                      >
                        <div className={styles.menu__dropdownTitle}>
                          Business
                        </div>
                        <div className={styles.menu__dropdownText}>
                          Accept major cryptocurrencies, manage fiat <br></br>{" "}
                          converson, keep or request payouts.
                        </div>
                      </a>
                    </div>
                    <div className={styles.menu__dropdownWrapper}>
                      <img
                        src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                        alt=""
                      />
                      <a
                        onClick={() =>
                          handleLinkClick(RouteNames.EXCHANGER_ROUTE)
                        }
                        href="https://alfa-crypto.com/fundraising"
                      >
                        <div className={styles.menu__dropdownTitle}>
                          Fundraising
                        </div>
                        <div className={styles.menu__dropdownText}>
                          Accept major cryptocurrencies, manage fiat <br></br>{" "}
                          converson, keep or request payouts.
                        </div>
                      </a>
                    </div>
                    <div className={styles.menu__dropdownWrapper}>
                      <img
                        src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                        alt=""
                      />
                      <a
                        onClick={() =>
                          handleLinkClick(RouteNames.EXCHANGER_ROUTE)
                        }
                        href="https://alfa-crypto.com/merchant"
                      >
                        <div className={styles.menu__dropdownTitle}>
                          Merchant
                        </div>
                        <div className={styles.menu__dropdownText}>
                          Send payments to multiple recipients <br></br>{" "}
                          simultaneously.
                        </div>
                      </a>
                    </div>
                    <div className={styles.menu__dropdownWrapper}>
                      <img
                        src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                        alt=""
                      />
                      <a
                        onClick={() =>
                          handleLinkClick(RouteNames.EXCHANGER_ROUTE)
                        }
                        href="https://alfa-crypto.com/demo"
                      >
                        <div className={styles.menu__dropdownTitle}>Demo</div>
                        <div className={styles.menu__dropdownText}>
                          Send payments to multiple recipients <br></br>{" "}
                          simultaneously.
                        </div>
                      </a>
                    </div>
                  </div>
                </a>
                <img
                  src={PUBLIC_IMAGE + "Header-arrowImageDown.svg"}
                  alt=""
                  className={styles.menu__itemArrow}
                />
              </li>
              <li className={styles.menu__listItem}>
                <a className={styles.menu__listLink}>
                  <a
                    onClick={() => handleLinkClick(RouteNames.EXCHANGER_ROUTE)}
                    href="https://alfa-crypto.com/company"
                  >
                    Company
                  </a>
                  <div
                    className={`${styles.menu__dropdownContent} ${styles.dropdown__company}`}
                  >
                    <div className={styles.menu__dropdownWrapper}>
                      <img
                        src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                        alt=""
                      />
                      <a href="#">
                        <div className={styles.menu__dropdownTitle}>
                          About us
                        </div>
                        <div className={styles.menu__dropdownText}></div>
                      </a>
                    </div>
                    <div className={styles.menu__dropdownWrapper}>
                      <img
                        src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                        alt=""
                      />
                      <a
                        onClick={() =>
                          handleLinkClick(RouteNames.EXCHANGER_ROUTE)
                        }
                        href="#"
                      >
                        <div className={styles.menu__dropdownTitle}>
                          Road map
                        </div>
                        <div className={styles.menu__dropdownText}>
                          Accept major cryptocurrencies, manage fiat <br></br>{" "}
                          converson, keep or request payouts.
                        </div>
                      </a>
                    </div>
                    <div className={styles.menu__dropdownWrapper}>
                      <img
                        src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                        alt=""
                      />
                      <a
                        onClick={() =>
                          window.open(
                            "https://alfa-crypto.com/white_paper",
                            "_blank"
                          )
                        }
                      >
                        <div className={styles.menu__dropdownTitle}>
                          White papper
                        </div>
                        <div className={styles.menu__dropdownText}>
                          Accept major cryptocurrencies, manage fiat <br></br>{" "}
                          converson, keep or request payouts.
                        </div>
                      </a>
                    </div>
                    <div className={styles.menu__dropdownWrapper}>
                      <img
                        src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                        alt=""
                      />
                      <a
                        onClick={() =>
                          handleLinkClick(RouteNames.EXCHANGER_ROUTE)
                        }
                        href="https://alfa-crypto.com/vacancies"
                      >
                        <div className={styles.menu__dropdownTitle}>
                          Vacancies
                        </div>
                        <div className={styles.menu__dropdownText}>
                          Send payments to multiple recipients <br></br>{" "}
                          simultaneously.
                        </div>
                      </a>
                    </div>
                    <div className={styles.menu__dropdownWrapper}>
                      <img
                        src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                        alt=""
                      />
                      <a
                        onClick={() =>
                          handleLinkClick(RouteNames.EXCHANGER_ROUTE)
                        }
                        href="#"
                      >
                        <div className={styles.menu__dropdownTitle}>FAQ</div>
                        <div className={styles.menu__dropdownText}>
                          Send payments to multiple recipients <br></br>{" "}
                          simultaneously.
                        </div>
                      </a>
                    </div>
                  </div>
                </a>
                <img
                  src={PUBLIC_IMAGE + "Header-arrowImageDown.svg"}
                  alt=""
                  className={styles.menu__itemArrow}
                />
              </li>
              <li className={styles.menu__listItem}>
                <a
                  onClick={() => {
                    handleLinkClick(RouteNames.EXCHANGER_ROUTE);
                    poolsStore.setIsConfirm(undefined);
                  }}
                  href="https://alfa-crypto.com/coming_soon"
                  className={styles.menu__listLink}
                >
                  Tokens
                </a>
              </li>
            </div>
            <div className={styles.menu__listItemLine}></div>
            <li className={`${styles.menu__listItem} ${styles.En}`}>
              <a href="#" className={styles.menu__listLink}>
                En
              </a>
            </li>
            <li className={styles.menu__listItem}>
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
            </li>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
