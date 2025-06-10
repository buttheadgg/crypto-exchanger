import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import styles from "../RunningLine/RunningLine.module.scss";
import RateCoin from "../RateCoin/RateCoin";
import { PUBLIC_ICON } from "../../constants";
type CoinRate = string;

interface CoinData {
  bitcoin: CoinRate;
  ethereum: CoinRate;
  tether: CoinRate;
  bnb: CoinRate;
  solana: CoinRate;
  xrp: CoinRate;
  spx: CoinRate;
  nasdaq: CoinRate;
  dji: CoinRate;
  gold: CoinRate;
  silver: CoinRate;
}

const RunningLIne = () => {
  const [coinData, setCoinData] = useState<CoinData>({
    bitcoin: "105254.586",
    ethereum: "3887.1804",
    tether: "0.99974155",
    bnb: "719.33575",
    solana: "218.28557",
    xrp: "2.5743759",
    spx: "6050.61",
    nasdaq: "22075.0",
    dji: "43449.9",
    gold: "2661.2",
    silver: "30.855",
  });

  const getCourse = async () => {
    try {
      const res = await fetch(
        "https://alfa-crypto.com/api/v1/exchange/currencies_header",
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Ошибка при получении данных с сервера");
      }

      const data: CoinData = await res.json();

      // Обновление состояния с новыми данными
      setCoinData((prevCoinData) => {
        const updatedCoinData = { ...prevCoinData };
        for (const [key, value] of Object.entries(data)) {
          if (key in updatedCoinData) {
            updatedCoinData[key as keyof CoinData] = value;
          }
        }
        return updatedCoinData;
      });

      console.log("Обновлённые данные:", data);
    } catch (error) {
      console.error("Ошибка при выполнении fetch-запроса:", error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div className={styles.marquee__wrapper}>
      <Marquee speed={50} autoFill={true}>
        {Object.entries(coinData).map(([key, value]) => {
          if (key === "spx") {
            return (
              <RateCoin
                key={key}
                image={PUBLIC_ICON + "spx.svg"}
                coinName={key}
                coinSecondName={key}
                coinPrice={value}
              />
            );
          }
          if (key === "dji") {
            return (
              <RateCoin
                key={key}
                image={PUBLIC_ICON + "dji.svg"}
                coinName={key}
                coinSecondName={key}
                coinPrice={value}
              />
            );
          }
          return (
            <RateCoin
              key={key}
              image={PUBLIC_ICON + key + ".svg"}
              coinName={key}
              coinSecondName={key}
              coinPrice={value}
            />
          );
        })}
      </Marquee>
    </div>
  );
};

export default RunningLIne;
