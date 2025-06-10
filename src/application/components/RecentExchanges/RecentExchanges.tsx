import React, { useEffect } from "react";
import styles from "./RecentExchanges.module.scss";
import { PUBLIC_ICON, PUBLIC_IMAGE } from "../../constants";
import { observer } from "mobx-react-lite";
import formStore from "../../stores/formStore";
import MyButton from "../UI/MyButton/MyButton";
import recentExchangesStore from "../../stores/recentExchagesStore";
import { formatDistanceToNow, parse } from "date-fns";
import RecentDiagram from "../RecentDiagram/RecentDiagram";

const RecentExchanges = () => {
  useEffect(() => {
    // Первый вызов при загрузке
    recentExchangesStore.fetchLitsExchanges();
    recentExchangesStore.fetchDiagramData();
  
    // Повторять каждые 10 секунд
    const interval = setInterval(() => {
      recentExchangesStore.fetchLitsExchanges();
      recentExchangesStore.fetchDiagramData();
    }, 10000);
  
    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  const shortenAddress = (
    address: string,
    start: number = 8,
    end: number = 8
  ): string => {
    if (!address || address.length < start + end + 2) return address;
    return `${address.slice(2, 2 + start)}...${address.slice(-end)}`;
  };

  const formatRelativeTime = (dateStr: string): string => {
    try {
      const parsedDate = parse(dateStr, "yyyy-MM-dd HH:mm:ss", new Date());
      return formatDistanceToNow(parsedDate, { addSuffix: true });
    } catch (e) {
      console.error("Invalid date format:", dateStr);
      return dateStr;
    }
  };

  const getFirstWord = (str: string): string => {
    return str.split(" ")[0];
  }

  const formatNumber = (value: string | number): string => {
    const num = Number(value);
    if (isNaN(num)) return "0";
    return num.toLocaleString("en-US"); // форматирует с запятой
  };

  return (
    <div
      className={`${
        formStore.dataValid
          ? styles.recentExchanges__wrapperNone
          : styles.recentExchanges__wrapper
      }`}
    >
      <div className={styles.recentExchangesText}>
        Recent exchanges of our customers
      </div>
      <div className={styles.recentExchanges__box}>
        <div className={styles.recentExchanges__headerStat}>
          <div className={styles.headerStat__countVolume}>
            <div className={styles.headerStat__count}>
              <div className={styles.headerStat__leftData}>
                <div className={styles.headerStat__name}>Count</div>
                <div className={styles.headerStat__totalValue}>
                  {formatNumber(
                    recentExchangesStore.diagramData?.total_count || 0
                  )}
                </div>
                <div className={styles.headerStat__total}>Total</div>
              </div>
              <div className={styles.headerStat__rightData}>
                <div className={styles.headerStat__more}></div>
                <div className={styles.headerStat__yesterdayValue}>
                  +
                  {formatNumber(
                    recentExchangesStore.diagramData?.yesterday_count || 0
                  )}
                </div>
                <div className={styles.headerStat__yesterday}>Yesterday</div>
              </div>
            </div>
            <div className={styles.headerStat__volume}>
              <div className={styles.headerStat__leftData}>
                <div className={styles.headerStat__name}>Trading Volume</div>
                <div className={styles.headerStat__totalValue}>
                  {formatNumber(
                    recentExchangesStore.diagramData?.total_volumes || 0
                  )}
                </div>
                <div className={styles.headerStat__total}>Total</div>
              </div>
              <div className={styles.headerStat__rightData}>
                <div className={styles.headerStat__more}> </div>
                <div className={styles.headerStat__yesterdayValue}>
                  +
                  {formatNumber(
                    recentExchangesStore.diagramData?.yesterday_volumes || 0
                  )}
                </div>
                <div className={styles.headerStat__yesterday}>Yesterday</div>
              </div>
            </div>
          </div>
          <div className={styles.headerStat__dailyDistribution}>
            <div className={styles.headerStat__dailyDistributionDiagram}>
              <RecentDiagram />
            </div>
            <img
              src={PUBLIC_IMAGE + "RecentExchangeImg.svg"}
              className={styles.headerStat__dailyDistributionImg}
            />
            <img
              src={PUBLIC_IMAGE + "recentGraf.svg"}
              className={styles.headerStat__dailyDistributionImgPhone}
            />
          </div>
        </div>
        <div
          className={`${styles.recentExchanges__sortLine} ${styles.recentExchanges__sortLineMob}`}
        >
          <div className={styles.sortLine__pay}>Pay</div>
          <div className={styles.sortLine__receive}>Receive</div>
          <div className={styles.sortLine__txHash}>Tx Hash</div>
          <div className={styles.sortLine__date}>Date</div>
        </div>
        <div className={styles.recentExchanges__dataInformationWrapper}>
          {Object.entries(recentExchangesStore.exchangesData).map(
            ([id, transaction]) => (
              <div key={id} className={styles.recentExchanges__dataInformation}>
                <div className={styles.dataInformation__wrapper}>
                  <div className={styles.dataInformation__img}>
                    <img
                      src={`${PUBLIC_ICON}${getFirstWord(transaction.currency_from).toLowerCase()}.svg`}
                    />
                  </div>
                  <div className={styles.dataInformation__name}>
                    {transaction.currency_from}
                  </div>
                  <div className={styles.dataInformation__value}>
                    {transaction.amount_from}
                  </div>
                </div>
                <div className={styles.dataInformation__arrow}>
                  <img src={PUBLIC_IMAGE + "dataInformationArrow.svg"} />
                </div>
                <div className={styles.dataInformation__cryptoWrapper}>
                  <div className={styles.cryptoWrapper__img}>
                    <img
                      src={`${PUBLIC_ICON}${getFirstWord(transaction.currency_to).toLowerCase()}.svg`}
                    />
                  </div>
                  <div className={styles.cryptoWrapper__cryptoNameWrapepr}>
                    <div className={styles.cryptoWrapper__cryptoName}>
                      {transaction.currency_to}
                    </div>
                  </div>
                  <div className={styles.cryptoWrapper__value}>
                    {transaction.amount_to}
                  </div>
                </div>
                <div className={styles.dataInformation__txHashWrapper}>
                  <div className={styles.txHashWrapper__value}>
                    {shortenAddress(transaction.sender)}
                  </div>
                  {/* <div className={styles.xHashWrapper__image}>
                  {" "}
                  <img src={PUBLIC_IMAGE + "copy.svg"} />{" "}
                </div> */}
                </div>
                <div className={styles.dataInformation__time}>
                  {formatRelativeTime(transaction.datetime)}
                </div>
              </div>
            )
          )}
          {Object.entries(recentExchangesStore.exchangesData)
            .slice(0, 3) // ← берём только первые 3
            .map(([id, transaction]) => (
              <div
                key={id}
                className={styles.recentExchanges__dataInformationMob}
              >
                <div className={styles.recentExchanges__TimeMob}>
                  {formatRelativeTime(transaction.datetime)}
                </div>

                <div
                  className={styles.recentExchanges__dataInformationMobWrapper}
                >
                  <div className={styles.recentExchanges__wrapperCountryMob}>
                    <div className={styles.recentExchanges__PayMob}>Pay</div>
                    <div className={styles.recentExchanges__wrapperCountryMob1}>
                      <div className={styles.recentExchanges__ImgCountryMob}>
                        {" "}
                        <img
                          src={`${PUBLIC_ICON}${getFirstWord(transaction.currency_from).toLowerCase()}.svg`}
                          alt=""
                        />
                      </div>
                      <div className={styles.recentExchanges__CountryTextMob}>
                        {transaction.currency_from}
                      </div>
                      <div className={styles.recentExchanges__CountryValueMob}>
                        {transaction.amount_from}
                      </div>
                    </div>
                  </div>
                  <div className={styles.dataInformation__arrowMob}>
                    <img src={PUBLIC_IMAGE + "dataInformationArrow.svg"} />
                  </div>
                  <div className={styles.recentExchanges__wrapperCoinMob}>
                    <div className={styles.recentExchanges__ReceiveMob}>
                      Receive
                    </div>
                    <div className={styles.recentExchanges__wrapperCoinMob1}>
                      <div className={styles.recentExchanges__ImgCoinMob}>
                        {" "}
                        <img src={`${PUBLIC_ICON}${getFirstWord(transaction.currency_to).toLowerCase()}.svg`} />
                      </div>
                      <div className={styles.recentExchanges__CoinWrapperMob}>
                        <div className={styles.recentExchanges__CoinTextMob}>
                          {transaction.currency_to}
                        </div>
                      </div>
                      <div className={styles.recentExchanges__CoinValueMob}>
                        {transaction.amount_to}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.recentExchanges__wrapeprHashMob}>
                  <div className={styles.recentExchanges__txHashMob}>
                    Tx Hash
                  </div>
                  <div className={styles.recentExchanges__HashTextMob}>
                  {shortenAddress(transaction.sender)}
                  </div>
                  <div className={styles.recentExchanges__txHashMobImg}>
                    {" "}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default observer(RecentExchanges);
