import React from "react";
import styles from "./Advantages.module.scss";
import { PUBLIC_IMAGE } from "../../constants";
import MyButton from "../UI/MyButton/MyButton";
import { observer } from "mobx-react-lite";
import formStore from "../../stores/formStore";

const Advantages = observer(() => {

  const handleCreateClick = () => {
    window.location.href = 'https://alfa-crypto.com/account';
  };

  return (
    <div
      className={`${
        formStore.dataValid
          ? styles.advantages__wraperNone
          : styles.advantages__wraper
      }`}
    >
      <div className={styles.advantages__text}>Advantages</div>
      <div className={styles.advantages__сontent}>
        <div className={styles.content__leftWrapper}>
          <div className={styles.content__payments}>
            <div className={styles.advantages__image}>
              <img src={PUBLIC_IMAGE + "AdvantagesPaymentsImg.svg"} />
            </div>
            <div className={styles.advantages__boxText}>
              <div className={styles.advantages__title}>
                Payments for goods and services in popular cryptocurrencies
              </div>
              <div className={styles.advantages__body}>
                Accept and make payments in Bitcoin, Bitcoin Cash, Litecoin,
                Ethereum, Dash, Tether ERC-20 and XRP.
              </div>
            </div>
            <div className={styles.advantages__bottomLine}></div>
          </div>
          <div className={styles.content__fast}>
            <div className={styles.advantages__image}>
              <img src={PUBLIC_IMAGE + "FastImg.svg"} />
            </div>
            <div className={styles.advantages__boxText}>
              <div className={styles.advantages__title}>Fast and safe</div>
              <div className={styles.advantages__body}>
                Instant transfers between your accounts. Fast payments
                processing.
              </div>
            </div>
            <div className={styles.fast__bottomLine}></div>
          </div>
        </div>
        <div className={styles.content__midWrapper}>
          <div className={styles.content__instant}>
            <div className={styles.instant__image}>
              <img src={PUBLIC_IMAGE + "AdvantagesInstansImg.svg"} />
            </div>
            <div className={styles.instant__title}>
              Instant conversion of incoming payments
            </div>
            <div className={styles.instant__body}>
              Real-time competitive cryptocurrency exchange rates.
            </div>
            <div className={styles.instant__bottomLine}></div>
          </div>
          <div className={styles.content__multi}>
            <div className={styles.advantages__image}>
              <img src={PUBLIC_IMAGE + "MultyImg.svg"} />
            </div>
            <div className={styles.advantages__boxText}>
              <div className={styles.advantages__title}>
                Multi-cryptocurrency online wallet
              </div>
              <div className={styles.advantages__body}>
                Secure storage for your cryptocurrencies.
              </div>
            </div>
            <div className={styles.multi__bottomLine}></div>
          </div>
        </div>
        <div className={styles.content__rightWrapper}>
          <div className={styles.content_allInformation}>
            <div className={styles.advantages__image}>
              <img src={PUBLIC_IMAGE + "InformationImg.svg"} />
            </div>
            <div className={styles.advantages__boxText}>
              <div className={styles.advantages__title}>
                All needed information in one place
              </div>
              <div className={styles.advantages__body}>
                Financial reports about incoming and outgoing operations.
              </div>
            </div>
            <div className={styles.allInformation__bottomLine}></div>
          </div>
          <div className={styles.content__secure}>
            <div className={styles.advantages__image}>
              <img src={PUBLIC_IMAGE + "secureImg.svg"} />
            </div>
            <div className={styles.advantages__boxText}>
              <div className={styles.advantages__title}>
                More secure and reliable than ever
              </div>
              <div className={styles.advantages__body}>
                Security by default: Two Factor Authentication is required in
                order to use your account.
              </div>
            </div>
            <div className={styles.secure__bottomLine}></div>
          </div>
        </div>
      </div>
      <MyButton className={styles.advantages__button} onClick={handleCreateClick}>Create account</MyButton>
    </div>
  );
});

export default Advantages;
