import React, { FC } from "react";
import styles from "./Reliability.module.scss";
import MyButton from "../UI/MyButton/MyButton";
import { PUBLIC_IMAGE } from "../../constants";
import { observer } from "mobx-react-lite";
import formStore from "../../stores/formStore";

interface ReliabilityProps {
  onScrollToForm: () => void
}

const Reliability: FC<ReliabilityProps> = observer(({ onScrollToForm }) => {

  return (
    <div
      className={`${
        formStore.dataValid
          ? styles.reliability__wrapperNone
          : styles.reliability__wrapper
      }`}
    >
      <div className={styles.reliability__imageWrapper}>
        <img src={PUBLIC_IMAGE + "ReliabilityImg.svg"} />
      </div>
      <div className={styles.reliability__line}>
        <div className={styles.reliability__image}>
          <img src={PUBLIC_IMAGE + "Main-logoImage.svg"}></img>
        </div>
        <div className={styles.reliability__lightBox}></div>
        <div className={styles.reliability__leftShadow}></div>
        <div className={styles.reliability__rightShadow}></div>
      </div>
      <div className={styles.reliability__content}>
        <div className={styles.reliability__title}>
          Reliability and safety
        </div>
        <div className={styles.reliability__list}>
          <li>Set your unique name on donation page</li>
          <li>Customize your donation with your unique alias</li>
          <li>Track your donations</li>
          <li>See all your previous donations</li>
          <li>Mobile-friendly page</li>
        </div>
        <MyButton onClick={onScrollToForm} className={styles.reliability__button}>exchange</MyButton>
      </div>
    </div>
  );
});

export default Reliability;
