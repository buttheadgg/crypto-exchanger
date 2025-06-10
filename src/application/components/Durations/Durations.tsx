import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./Durations.module.scss";
import { PUBLIC_ICON, PUBLIC_IMAGE } from "../../constants";
import poolsStore from "../../stores/poolsStore";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

const Durations = () => {
  useEffect(() => {
    poolsStore.fetchFormData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("All Durations");

  const autoSelectPeriod = (coin: string, period: string) => {
    runInAction(() => {
      poolsStore.updateField("coin", coin);
      poolsStore.updateField("period", period);
    });
  };

  const handleSelectPeriod = (coin: string, period: string) => {
    runInAction(() => {
      poolsStore.updateField("coin", coin);
      poolsStore.updateField("period", period);
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(e.target.value);
  };

  const filteredCoins = Object.entries(poolsStore.formData)
    .filter(([coin]) => coin.toLowerCase().includes(searchTerm))
    .filter(([_, { detail }]) =>
      selectedDuration === "All Durations"
        ? true
        : detail.periods.some((period) => period.period === selectedDuration)
    );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    poolsStore.updateField(name, value);
  };

  const scrollToTop = () => {
    const offset = (window.innerHeight * 20) / 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  const handleSubscribe = () => {
    console.log(poolsStore.formDataPools);
    poolsStore.setIsSubscribe(true);
    poolsStore.setIsConfirm(0);
    scrollToTop();
  };




  return (
    <div className={styles.durations__wrapper}>
      <div className={styles.durations__wrapperHeader}>
        <div className={styles.durations__title}>
          Principal-protected Products
        </div>
        <div className={styles.durations__text}>
          Earn Rewards on principal-protectsd products/
        </div>
        <div className={styles.durations__search}>
          <div className={styles.durations__searchInputWrapper}>
            <input
              className={styles.durations__searchInput}
              placeholder="Search coins"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className={styles.durations__searchInputImg}>
              <img
                src={PUBLIC_IMAGE + "durationSearch.svg"}
                alt="иконка лупы"
              />
            </div>
          </div>
          <div className={styles.durations__searchSelect}>
            <select value={selectedDuration} onChange={handleDurationChange}>
              <option value="All Durations">All Durations</option>
              <option value="0">Flexible</option>
              <option value="7">7 Days</option>
              <option value="21">21 Days</option>
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
              <option value="120">120 Days</option>
            </select>
          </div>
          <div className={styles.durations__searchCheckbox}>
            <input
              name="мatchAssets"
              type="checkbox"
              className={styles.durations__checkbox}
              id="checkboxDuration"
              onChange={handleChange}
            />
            <div className={styles.durations__checkboxText}>
              Match My Assets
            </div>
          </div>
        </div>
      </div>
      <div className={styles.durations__body}>
        <div className={styles.durations__bodyHeaderLine}>
          <div className={styles.durations__bodyHeaderCoin}>Coin</div>
          <div className={styles.durations__bodyHeaderArp}>APR</div>
          <div className={styles.durations__bodyHeaderDuration}>
            Duration (Days)
          </div>
          <div className={styles.durations__bodyHeaderZero}></div>
        </div>
        {filteredCoins.map(([coin, { detail }]) => {
          const isActiveCoin = poolsStore.formDataPools.coin === coin;
          const selectedPeriod = isActiveCoin
            ? poolsStore.formDataPools.period
            : null;

          return (
            <div key={coin} className={styles.durations__bodyLine}>
              <div className={styles.durations__bodyLineCoinWrapper}>
                <div className={styles.durations__bodyLineCoinImg}>
                  <img
                    src={`${PUBLIC_ICON}${coin.toLowerCase()}.svg`}
                    alt={coin}
                  />
                </div>
                <div className={styles.durations__bodyLineCoin}>{coin}</div>
              </div>

              <div className={styles.durations__bodyLineProcentWrapper}>
                <div className={styles.durations__bodyLineProcent}>
                  {detail.apyRange.length === 2
                    ? `${(parseFloat(detail.apyRange[0]) * 100).toFixed(2)}%-${(
                        parseFloat(detail.apyRange[1]) * 100
                      ).toFixed(2)}%`
                    : `${(parseFloat(detail.highestApy) * 100).toFixed(2)}%`}
                </div>
                <div className={styles.durations__bodyLineEarn}>
                  Earn {coin}
                </div>
              </div>

              <div className={styles.durations__bodyLineDurationWrapper}>
                {detail.periods.map((period, index) => (
                  
                  <div
                    key={`${coin}-${index}`}
                    onClick={() => {
                      handleSelectPeriod(coin, period.period);
                      poolsStore.updateField("selectedProcent", period.apy);
                      poolsStore.updateField(
                        "minValue",
                        period.minPurchaseAmount
                      );
                    }}
                    className={`${
                      isActiveCoin && selectedPeriod === period.period
                        ? styles.durations__bodyLineDurationActive
                        : styles.durations__bodyLineDuration
                    }`}
                  >
                    {period.period === "0" ? "Flexible" : period.period}
                  </div>
                ))}
              </div>
              <div className={styles.durations__bodyLineButtonBack}>
                <button
                  className={`${styles.durations__bodyLineButton} ${
                    isActiveCoin && selectedPeriod
                      ? styles.durations__bodyLineDurationActive
                      : ""
                  }`}
                  disabled={!isActiveCoin || !selectedPeriod}
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.durations__bodyMobil}>
        <div className={styles.durations__bodyHeadMobil}>
          <div className={styles.durations__headCoinMobil}>Coin</div>
          <div className={styles.durations__headAPRMobil}>APR</div>
        </div>
        {filteredCoins.map(([coin, { detail }]) => {
          const isActiveCoin = poolsStore.formDataPools.coin === coin;
          const selectedPeriod = isActiveCoin
            ? poolsStore.formDataPools.period
            : null;
          return (
            <div className={styles.durations__bodyBoxMobil}>
              <div className={styles.durations__BoxNameWrapperMobil}>
                <div key={coin} className={styles.durations__BoxNameMobil}>
                  <div className={styles.durations__BoxNameMobilImg}>
                    <img
                      src={`${PUBLIC_ICON}${coin.toLowerCase()}.svg`}
                      alt={coin}
                    />
                  </div>
                  <div>{coin}</div>
                </div>
                <div className={styles.durations__BoxValueMobil}>
                  <div className={styles.durations__BoxValueProcentMobil}>
                    {detail.apyRange.length === 2
                      ? `${(parseFloat(detail.apyRange[0]) * 100).toFixed(
                          2
                        )}% - ${(parseFloat(detail.apyRange[1]) * 100).toFixed(
                          2
                        )}%`
                      : `${(parseFloat(detail.highestApy) * 100).toFixed(2)}%`}
                  </div>
                  <div className={styles.durations__BoxValueNameMobil}>
                    Earn {coin}
                  </div>
                </div>
              </div>
              <div className={styles.durations__BoxNameDurationMobil}>
                Duration (Days)
              </div>
              <div className={styles.durations__BoxDurationWrapperMobil}>
                <div className={styles.durations__BoxDurationVariantsMobil}>
                  {detail.periods.map((period, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleSelectPeriod(coin, period.period);
                        poolsStore.updateField("selectedProcent", period.apy);
                        poolsStore.updateField(
                          "minValue",
                          period.minPurchaseAmount
                        );
                      }}
                      className={`${
                        selectedPeriod === period.period
                          ? styles.durations__BoxDurationVariantsBoxMobilActive
                          : styles.durations__BoxDurationVariantsBoxMobil
                      }`}
                    >
                      {period.period === "0" ? "Flexible" : period.period}
                    </div>
                  ))}
                </div>
                <div className={styles.durations__BoxDurationButtonMobil}>
                  <button
                    className={`${styles.durations__bodyLineButton} ${
                      isActiveCoin && selectedPeriod
                        ? styles.durations__bodyLineDurationActive
                        : ""
                    }`}
                    disabled={!isActiveCoin || !selectedPeriod}
                    onClick={handleSubscribe}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(Durations);
