import React, { ChangeEvent, useEffect } from "react";
import styles from "./PoolsModalHoldings.module.scss";
import { PUBLIC_ICON, PUBLIC_IMAGE } from "../../../constants";
import poolsStore from "../../../stores/poolsStore";
import { observer } from "mobx-react-lite";

const PoolsModalHoldings = () => {
  const { formData, formDataPools } = poolsStore;
  const selectedCoin = formDataPools.coin;
  const selectedPeriod = formDataPools.period;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    poolsStore.updateField(name, value);
  };

  const scrollToTop = () => {
    const offset = (window.innerHeight * 20) / 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };


  const handleButtonBack = () => {
    poolsStore.setIsConfirm(0);
    poolsStore.updateField("agreeConditions", "");
  };

  const handleButtonSubscribe = () => {
    poolsStore.setIsConfirm(1);
    scrollToTop();
  };

  const handleButtonClose = () => {
    poolsStore.setIsSubscribe(undefined);
  };
  
  useEffect(() => {
    const handlePopState = () => {
      handleButtonClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  return (
    <div className={styles.holdings__wrapper}>
      <img className={styles.modal__widowClose} src={PUBLIC_IMAGE+"closeForm.svg"} onClick={handleButtonClose}></img>
      <div className={styles.holdings__wrapperHead}>
        <div className={styles.holdings__coin}>
          <div className={styles.holdings__coinImg}>
            <img
              src={`${PUBLIC_ICON}${selectedCoin.toLowerCase()}.svg`}
              alt={selectedCoin}
            />
          </div>
          <div className={styles.holdings__CoinNameWrapper}>
            <div className={styles.holdings__CoinNameTitle}>{selectedCoin }</div>
            <div className={styles.holdings__CoinNameText}>
              Simple Earn Locked
            </div>
          </div>
        </div>
        <div className={styles.holdings__valueWrapper}>
          <div className={styles.holdings__valueHeader}>{poolsStore.formDataPools.predictAmount}</div>
          <div className={styles.holdings__valueEquils}>≈ $ {101*poolsStore.formDataPools.predictAmount}</div>
        </div>
        <div className={styles.holdings__buttonWrapper}>
          <button
            onClick={handleButtonSubscribe}
            className={styles.holdings__buttonSub}
          >
            Subscribe
          </button>
          <button
            onClick={handleButtonBack}
            className={styles.holdings__buttonCancel}
          >
            Cancel
          </button>
        </div>
        <div className={styles.holdings__textForCancel}>
          *Eligible for cancellation. Refer to the Product Rules For more
          details.
        </div>
        <div className={styles.holdings__checkboxWraper}>
          <div className={styles.amount__checkbox}>
            {" "}
            <input
              name="autoSubscribe"
              type="checkbox"
              className={styles.amount__checkbox1}
              id="checkbox1"
              onChange={handleChange}
              defaultChecked={true}
            />
            <div className={styles.durations__checkboxText}>Auto-Subscribe</div>
          </div>
        </div>
      </div>
      <div className={styles.holdings__rerwardWrapper}>
        <div className={styles.holdings__rerwardText}>
          <div className={styles.holdings__rerwardTextHead}>
            Rerward Amount{" "}
          </div>
          <div>Est. APR</div>
          <div>Locked Period (Days)</div>
          <div>Accrue Days</div>
          <div>
            Estimated Next <br></br>
            Distribution Amount
          </div>
        </div>
        <div className={styles.holdings__rerwardValue}>
          <div>--</div>
          <div className={styles.holdings__rerwardValueGroup}>
            <div className={styles.holdings__rerwardValueGroupImg}>
              <img
                src={`${PUBLIC_ICON}${selectedCoin.toLowerCase()}.svg`}
                alt={selectedCoin}
              />
            </div>
            <div>
              {" "}
              <span>
                {(
                  parseFloat(poolsStore.formDataPools.selectedProcent) * 100
                ).toFixed(2)}
                % 
              </span>
            </div>
          </div>
          <div className={styles.holdings__rewardValueDays}>{poolsStore.formDataPools.period} Days</div>
          <div >0 days</div>
          <div className={styles.holdings__rerwardValueUSD}>
            {poolsStore.formDataPools.predictAmount} {selectedCoin}
          </div>
        </div>
      </div>
      <div className={styles.holdings__subscroptionWrapper}>
        <div className={styles.holdings__subscroptionTextWrapper}>
          <div className={styles.holdings__subscroptionImg}>
            {" "}
            <img src={PUBLIC_IMAGE + "progressLine.svg"} alt="" />{" "}
          </div>
          <div className={styles.holdings__subscroptionText}>
            <div className={styles.holdings__subscroptionText1}>
              Subscroption Date
            </div>
            <div className={styles.holdings__subscroptionText2}>
              Next Interest Distription Date
            </div>
            <div className={styles.holdings__subscroptionText3}>
              Interest End Date
            </div>
            <div className={styles.holdings__subscroptionText4}>Redeem to</div>
            <div className={styles.holdings__subscroptionText5}>
              Simple Earn Flexible Products{" "}
              <img src={PUBLIC_IMAGE + "Header-arrowImageDown.svg"} alt="" />{" "}
            </div>
          </div>
        </div>
        <div className={styles.holdings__subscroptionValueWrapper}>
          <div className={styles.holdings__subscroptionValueTop}>
            2025-01-30 03:00
          </div>
          <div>2025-01-30 03:00</div>
          <div>2025-01-30 03:00</div>
          <div>2025-01-30 03:00</div>
        </div>
      </div>
      <div className={styles.holdings__subscroptionWrapperMob}>
        <div className={styles.holdings__subscroptionImgMob}>
          <img src={PUBLIC_IMAGE + "ProgressLineMob1.svg"} />
        </div>
        <div className={styles.holdings__subscroptionTextWrapperMob}>
          <div className={styles.holdings__subscroptionTextHeadMob}>
            Subscroption Date <span>2025-01-30 03:00</span>
          </div>
          <div className={styles.holdings__subscroptionTextbodyWrapperMob}>
            <div className={styles.holdings__subscroptionTextMob}>
              Next Interest Distription Date <span>2025-01-30 03:00</span>{" "}
            </div>
            <div className={styles.holdings__subscroptionTextMob}>
              Interest End Date <span>2025-01-30 03:00</span>
            </div>
            <div className={styles.holdings__subscroptionTextMob}>
              Redeem to <span>2025-01-30 03:00</span>
            </div>
            <div className={styles.holdings__subscroptionTextMob1}>
              {" "}
              Simple Earn Flexible Products{" "}
              <img
                src={PUBLIC_IMAGE + "Header-arrowImageDown.svg"}
                alt=""
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(PoolsModalHoldings);
