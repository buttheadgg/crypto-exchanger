import styles from "./LearnMore.module.scss";
import { PUBLIC_IMAGE } from "../../constants";
import poolsStore from "../../stores/poolsStore";
import { observer } from "mobx-react-lite";

const LearnMore = () => {
  return (
    <div className={`${poolsStore.isSubscribe? styles.LearnMoreNone :  styles.LearnMore}`}>
      <div className={styles.LearnMore__borderTop}></div>
      <div className={styles.LearnMore__content}>
        <div className={styles.LearnMore__image}>
          <img src={PUBLIC_IMAGE + "learnMoreImg.svg"} alt="" />
        </div>
        <div className={styles.LearnMore__line}>
          <div
            className={`${styles.information__lineBox} ${styles.info__boxLeft}`}
          ></div>
          <div
            className={`${styles.information__lineBox} ${styles.info__boxRight}`}
          ></div>
          <div className={styles.information__lightBox}></div>
          <div className={styles.main__informationLogo}>
            <img src={PUBLIC_IMAGE + "Main-logoImage.svg"} alt="" />
          </div>
        </div>
        <div className={styles.LearnMore__page}>
          <div className={styles.LearnMore__title}>Learn more</div>
          <div className={styles.LearnMore__text}>
            <div className={styles.LearnMore__textTitle}>Flexible products</div>
            <div className={styles.LearnMore__textBody}>
              Cryptocurrency donations are secure for your sponsors because of
              the cryptocurrency nature: of not revealing much of private
              financial information
            </div>
            <div className={styles.LearnMore__textTitle}>Locked Products</div>
            <div className={styles.LearnMore__textBody}>
              Cryptocurrency donations are secure for your sponsors because of
              the cryptocurrency nature: of not revealing much of private
              financial information
            </div>
            <div className={styles.LearnMore__textTitle}>
              Launchpool & Megadrop Rewards
            </div>
            <div className={styles.LearnMore__textBody}>
              Cryptocurrency donations are secure for your sponsors because of
              the cryptocurrency nature: of not revealing much of private
              financial information
            </div>
            <div className={styles.LearnMore__textTitle}>Auto-Subscription</div>
            <div className={styles.LearnMore__textBody}>
              Cryptocurrency donations are secure for your sponsors because of
              the cryptocurrency nature: of not revealing much of private
              financial information
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(LearnMore);
