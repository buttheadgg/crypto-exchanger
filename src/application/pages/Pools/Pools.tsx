import React, { useRef } from "react";
import styles from "./Pools.module.scss";
import LearnMore from "../../components/LearnMore/LearnMore";
import FrequentlyQuestions from "../../components/FrequentlyQuestions/FrequentlyQuestions";
import Durations from "../../components/Durations/Durations";
import PoolsModalSubscribe from "../../components/PoolsModalWindows/PoolsModalSubscribe/PoolsModalSubscribe";
import PoolsModalSuccessful from "../../components/PoolsModalWindows/PoolsModalSuccessful/PoolsModalSuccessful";
import PoolsModalHoldings from "../../components/PoolsModalWindows/PoolsModalHoldings/PoolsModalHoldings";
import PoolsModalCancel from "../../components/PoolsModalWindows/PoolsModalCancel/PoolsModalCancel";
import PoolsModalSuccessfulFinal from "../../components/PoolsModalWindows/PoolsModalSuccessfulFinal/PoolsModalSuccessfulFinal";
import { Helmet } from "react-helmet";

const Pools = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Helmet>
        <title>Pools</title>
      </Helmet>
      <div className={styles.main__pools}>
        <div className={styles.main__wrapper}>
          <Durations />
          <LearnMore />
          <FrequentlyQuestions />
        </div>
      </div>
    </>
  );
};

export default Pools;
