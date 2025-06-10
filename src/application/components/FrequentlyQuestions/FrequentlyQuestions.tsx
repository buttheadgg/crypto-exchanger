import React from "react";
import styles from "./FrequentlyQuestions.module.scss";
import { PUBLIC_IMAGE } from "../../constants";
import poolsStore from "../../stores/poolsStore";
import { observer } from "mobx-react-lite";
const FrequentlyQuestions = () => {
  return (
    <div className={`${poolsStore.isSubscribe ? styles.faqNone : styles.faq}`}>
      <div className={styles.faq__content}>
        <h2 className={styles.faq__title}>FAQ</h2>
        <details className={styles.faq__details}>
          <summary className={styles.faq__legend}>
            {" "}
            <p className={styles.faq__legendText}>
              1. How does Simple Earn work?
            </p>
            <span className={styles.faq__icon}></span>{" "}
          </summary>
          <p className={styles.faq__listText}>
            This is the privacy policy of Slice Media N.V. (owner and operator
            of Primedice.) This Privacy Policy sets out how Primedice.com will
            manage your personal information which we collect as a result of
            your membership of Primedice, your use of our websites located at
            https://primedice.com and any pages or websites under the
            'Primedice' brand including any mobile phone or tablet applications
            that are owned and/or operated by us or whenever we otherwise deal
            with you. We are committed to ensuring that the personal information
            we collect about you is protected and is used, stored and disclosed
            in accordance with the Privacy Act and this Privacy Policy.
          </p>
        </details>
        <details className={styles.faq__details}>
          <summary className={styles.faq__legend}>
            {" "}
            <p className={styles.faq__legendText}>
              2. Anagement of your Personal Information?
            </p>
            <span className={styles.faq__icon}></span>{" "}
          </summary>
          <p className={styles.faq__listText}>
            This is the privacy policy of Slice Media N.V. (owner and operator
            of Primedice.) This Privacy Policy sets out how Primedice.com will
            manage your personal information which we collect as a result of
            your membership of Primedice, your use of our websites located at
            https://primedice.com and any pages or websites under the
            'Primedice' brand including any mobile phone or tablet applications
            that are owned and/or operated by us or whenever we otherwise deal
            with you. We are committed to ensuring that the personal information
            we collect about you is protected and is used, stored and disclosed
            in accordance with the Privacy Act and this Privacy Policy.
          </p>
        </details>
        <details className={styles.faq__details}>
          <summary className={styles.faq__legend}>
            {" "}
            <p className={styles.faq__legendText}>
              3. irect Marketing and Opting Out?
            </p>
            <span className={styles.faq__icon}></span>{" "}
          </summary>
          <p className={styles.faq__listText}>
            This is the privacy policy of Slice Media N.V. (owner and operator
            of Primedice.) This Privacy Policy sets out how Primedice.com will
            manage your personal information which we collect as a result of
            your membership of Primedice, your use of our websites located at
            https://primedice.com and any pages or websites under the
            'Primedice' brand including any mobile phone or tablet applications
            that are owned and/or operated by us or whenever we otherwise deal
            with you. We are committed to ensuring that the personal information
            we collect about you is protected and is used, stored and disclosed
            in accordance with the Privacy Act and this Privacy Policy.
          </p>
        </details>
        <details className={styles.faq__details}>
          <summary className={styles.faq__legend}>
            {" "}
            <p className={styles.faq__legendText}>
              4. Security of Personal Information?
            </p>
            <span className={styles.faq__icon}></span>{" "}
          </summary>
          <p className={styles.faq__listText}>
            This is the privacy policy of Slice Media N.V. (owner and operator
            of Primedice.) This Privacy Policy sets out how Primedice.com will
            manage your personal information which we collect as a result of
            your membership of Primedice, your use of our websites located at
            https://primedice.com and any pages or websites under the
            'Primedice' brand including any mobile phone or tablet applications
            that are owned and/or operated by us or whenever we otherwise deal
            with you. We are committed to ensuring that the personal information
            we collect about you is protected and is used, stored and disclosed
            in accordance with the Privacy Act and this Privacy Policy.
          </p>
        </details>
        <details className={styles.faq__details}>
          <summary className={styles.faq__legend}>
            {" "}
            <p className={styles.faq__legendText}>
              5. Access to Personal Information?
            </p>
            <span className={styles.faq__icon}></span>{" "}
          </summary>
          <p className={styles.faq__listText}>
            This is the privacy policy of Slice Media N.V. (owner and operator
            of Primedice.) This Privacy Policy sets out how Primedice.com will
            manage your personal information which we collect as a result of
            your membership of Primedice, your use of our websites located at
            https://primedice.com and any pages or websites under the
            'Primedice' brand including any mobile phone or tablet applications
            that are owned and/or operated by us or whenever we otherwise deal
            with you. We are committed to ensuring that the personal information
            we collect about you is protected and is used, stored and disclosed
            in accordance with the Privacy Act and this Privacy Policy.
          </p>
        </details>
        <details className={styles.faq__details}>
          <summary className={styles.faq__legend}>
            {" "}
            <p className={styles.faq__legendText}>6. Delete Personal Data?</p>
            <span className={styles.faq__icon}></span>{" "}
          </summary>
          <p className={styles.faq__listText}>
            This is the privacy policy of Slice Media N.V. (owner and operator
            of Primedice.) This Privacy Policy sets out how Primedice.com will
            manage your personal information which we collect as a result of
            your membership of Primedice, your use of our websites located at
            https://primedice.com and any pages or websites under the
            'Primedice' brand including any mobile phone or tablet applications
            that are owned and/or operated by us or whenever we otherwise deal
            with you. We are committed to ensuring that the personal information
            we collect about you is protected and is used, stored and disclosed
            in accordance with the Privacy Act and this Privacy Policy.
          </p>
        </details>
        <img
          src={PUBLIC_IMAGE + "faq-left-borderImage.svg"}
          alt=""
          className={styles.faq__imageLeft}
        />
          <img
            src={PUBLIC_IMAGE + "faq-left-borderMob.png"}
            alt=""
            className={styles.faq__imageLeftMob}
          />

        <img
          src={PUBLIC_IMAGE + "faq-right-borderImage.svg"}
          alt=""
          className={styles.faq__imageRight}
        />
        <img
          src={PUBLIC_IMAGE + "faq-right-borderMob.png"}
          alt=""
          className={styles.faq__imageRightMob}
        />
      </div>
      <div className={`${styles.faq__imageLeft} ${styles.faq__backgroundLeft}`}>
        <img
          src={PUBLIC_IMAGE + "faq-backgroundImage.svg"}
          alt="faq-backgroundImage"
        />
      </div>
      <div
        className={`${styles.faq__imageRight} ${styles.faq__backgroundRight}`}
      >
        <img
          src={PUBLIC_IMAGE + "faq-backgroundImage.svg"}
          alt="faq-backgroundImage"
        />
      </div>
    </div>
  );
};

export default observer(FrequentlyQuestions);
