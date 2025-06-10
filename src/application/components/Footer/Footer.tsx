import React from "react";
import styles from "./Footer.module.scss";
import { PUBLIC_IMAGE } from "../../constants";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { publicRoutes, RouteNames } from "../../routes/routes";

const Footer = observer(() => {
  const mainLogoPath = PUBLIC_IMAGE + "main-logo.svg";
  const navigate = useNavigate();

  const handleLinkClick = (route: string) => {
    navigate(route);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header__innerFooterMain}>
            <img src={mainLogoPath} alt="Main logo" />
            <nav className={styles.menu}>
              <ul className={styles.menu__listHeader}>
                <li className={styles.menu__listItem}>
                  <a href="#" className={styles.menu__listLink}>
                    Exchanger
                  </a>
                </li>
                <li className={styles.menu__listItem}>
                  <a
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
                    href="#"
                    className={styles.menu__listLink}
                    onClick={() => {
                      navigate(RouteNames.POOLS_ROUTE);
                      handleLinkClick(RouteNames.POOLS_ROUTE);
                    }}
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
                    href="https://alfa-crypto.com/sheepy"
                    className={styles.menu__listLink}
                  >
                    Sheepy
                    <div
                      className={`${styles.menu__dropdownContent} ${styles.dropdown__sheepyBurger} ${styles.dropdown__sheepyFooter}`}
                    >
                      <div className={styles.menu__dropdownWrapper}>
                        <img src="./image/dropdown-iconImage.svg" alt="" />
                        <a href="https://alfa-crypto.com/sheepy">
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
                        <img src="./image/dropdown-iconImage.svg" alt="" />
                        <a href="https://alfa-crypto.com/fundraising">
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
                        <img src="./image/dropdown-iconImage.svg" alt="" />
                        <a href="https://alfa-crypto.com/merchant">
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
                        <img src="./image/dropdown-iconImage.svg" alt="" />
                        <a href="https://alfa-crypto.com/demo">
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
                  <a
                    href="https://alfa-crypto.com/company"
                    className={styles.menu__listLink}
                  >
                    Company
                    <div
                      className={`${styles.menu__dropdownContent} ${styles.dropdown__companyBurger} ${styles.dropdown__companyFooter}`}
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
                          <div className={styles.menu__dropdownText}>

                          </div>
                        </a>
                      </div>
                      <div className={styles.menu__dropdownWrapper}>
                        <img
                          src={PUBLIC_IMAGE + "dropdown-iconImage.svg"}
                          alt=""
                        />
                        <a href="#">
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
                        onClick={() => window.open("https://alfa-crypto.com/white_paper", "_blank")}
                        >
                          <div className={styles.menu__dropdownTitle}
                          >
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
                        <a href="https://alfa-crypto.com/vacancies">
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
                        <a href="#">
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
                    href="https://alfa-crypto.com/coming_soon"
                    className={styles.menu__listLink}
                  >
                    Tokens
                  </a>
                </li>
                <div className={styles.menu__listItemLine}></div>
                <li className={styles.menu__listItem}>
                  <a
                    href="https://alfa-crypto.com/account"
                    className={styles.menu__listLink}
                  >
                    Account
                  </a>
                </li>
                <li className={styles.menu__listItem}>
                  <a href="#" className={styles.menu__listLink}>
                    En
                  </a>
                </li>
                <li className={styles.menu__listItem}>
                  <a
                    href="https://alfa-crypto.com/account"
                    className={styles.menu__listLink}
                  >
                    Account
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.header__innerFooterPhone}>
            <ul className={styles.menu_listFooter}>
              <li className={styles.menu__listItem}>
                <a
                  href="#"
                  className={`${styles.menu__listLink} ${styles.footer_listItem}`}
                >
                  Products
                </a>
              </li>
              <li className={styles.menu__listItem}>
                <a
                  href="#"
                  className={`${styles.menu__listLink} ${styles.footer_listItem}`}
                >
                  Company
                </a>
              </li>
              <li className={styles.menu__listItem}>
                <a
                  className={`${styles.menu__listLink} ${styles.footer_listItem}`}
                >
                  Road map
                </a>
              </li>
              <li className={styles.menu__listItem}
              onClick={() => window.open("https://alfa-crypto.com/white_paper", "_blank")}
              >
                <a
                  className={`${styles.menu__listLink} ${styles.footer_listItem}`}
                >
                  White papper
                </a>
              </li>
              <li className={styles.menu__listItem}>
                <a
                  className={`${styles.menu__listLink} ${styles.footer_listItem}`}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footer__inner}>
        <div className={styles.footer__contact}>
          <div className={styles.container}>
            <div className={styles.footer__contactWrapper}>
              <div className={styles.footer__contactInput}>
                <p className={styles.footer__contactText}>Contact Us</p>
                <div className={styles.footer__inputBox}>
                  <input
                    type="text"
                    placeholder="youremail@domain.com"
                    className={styles.footer__inputForm}
                  />
                  <button className={styles.footer__contactButton}>SENT</button>
                </div>
              </div>
              <div className={styles.footer__contactItem}>
                <a href="#" className={styles.footer__contactLink}>
                  <img src={PUBLIC_IMAGE + "X.svg"} alt="" />
                </a>
                <a href="#" className={styles.footer__contactLink}>
                  <img src={PUBLIC_IMAGE + "thred.svg"} alt="" />
                </a>
                <a href="#" className={styles.footer__contactLink}>
                  <img src={PUBLIC_IMAGE + "inst.svg"} alt="" />
                </a>
                <a href="#" className={styles.footer__contactLink}>
                  <img src={PUBLIC_IMAGE + "discord.svg"} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copy__nav}>
          <ul className={styles.copy__navList}>
            <li className={styles.copy__navItem}>
              <a href="#" className={styles.copy__navLink}>
                © Copyright{" "}
              </a>
            </li>
            <span className={styles.copy__navPoint}></span>
            <li>
              <a href="#" className={styles.copy__navLink}>
                Privacy policy
              </a>
            </li>
            <span className={styles.copy__navPoint}></span>
            <li className={styles.copy__navItem}>
              <a href="#" className={styles.copy__navLink}>
                Terms of service
              </a>
            </li>
          </ul>
        </div>
        <div
          className={`${styles.light__box} ${styles.light__boxFooter}`}
        ></div>
      </div>
    </footer>
  );
});

export default Footer;
