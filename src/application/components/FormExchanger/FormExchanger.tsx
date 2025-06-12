import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import styles from "./FormExchanger.module.scss";
import MyButton from "../UI/MyButton/MyButton";
import MyInput from "../UI/MyInput/MyInput";
import { PUBLIC_ICON, PUBLIC_IMAGE } from "../../constants";
import FormBodyCryprtoBank from "./FormBodyCryprtoBank/FormBodyCryprtoBank";
import FormBodyCryptoCash from "./FormBodyCryptoCash/FormBodyCryptoCash";
import FormBodyCashCrypto from "./FormBodyCashCrypto/FormBodyCashCrypto";
import FormBodyBankCrypto from "./FormBodyBankCrypto/FormBodyBankCrypto";
import formStore from "../../stores/formStore";
import { JsonData } from "../types/types";
import { observer } from "mobx-react-lite";
import FormBodyCryptoCrypto from "./FormBodyCryptoCrypto/FormBodyCryptoCrypto";
import poolsStore from "../../stores/poolsStore";

const FormExchanger: FC = observer(() => {
  const formHeaderImage = PUBLIC_IMAGE + "Main-logoImage.svg";
  const [selectedPay, setSelectedPay] = useState("");
  const [selectedReceive, setSelectedReceive] = useState("");

  const jsonData: JsonData = {
    "USDT TRC 20": {
      directions: {
        "Наличные RUB": {
          id: "91",
          name: "Cash RUB",
          icon: `${PUBLIC_ICON}Cash.svg`,
          min: "1",
          max: "100",
          reserve: "999",
          type: "cash",
          code: "RUB",
        },
      },
      cur_name: "Tether TRC20 (USDT)",
      icon: `${PUBLIC_ICON}Tether (USDT) (1).svg`,
      id: "10",
      min: "1",
      max: "100",
      type: "crypto",
      rate: "999",
      code: "USDT",
    },
    "Наличные RUB": {
      directions: {
        "USDT TRC 20": {
          id: "10",
          name: "Tether TRC20 (USDT)",
          icon: `${PUBLIC_ICON}Tether (USDT) (1).svg`,
          min: "1",
          max: "100",
          reserve: "999",
          type: "crypto",
          code: "USDT",
        },
      },
      cur_name: "Cash RUB",
      icon: `${PUBLIC_ICON}Cash.svg`,
      id: "91",
      min: "1",
      max: "100",
      type: "cash",
      rate: "999",
      code: "RUB",
    },
  };

  const payOptions = Object.keys(jsonData);
  const receiveOptions = useMemo(() => {
    return selectedPay
      ? Object.keys(jsonData[selectedPay]?.directions || {})
      : [];
  }, [selectedPay]);

  const sendData = async () => {
    console.log("Отправляю на бек", formStore.formData);
    try {
      const res = await fetch(
        "https://obmen.vip/api/v1/exchange/confirmation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formStore.formData),
        }
      );

      if (!res.ok) {
        throw new Error(`Ошибка сервера: ${res.status}`);
      }

      const result = await res.json();

      if (result.transactionId) {
        formStore.updateField("transactionId", result.transactionId);
        console.log(`Transaction ID записан:`, formStore.formData);
      } else {
        console.warn("Transaction ID отсутствует в ответе.");
      }

      formStore.updateFinalData("response", result);
    } catch (error) {
      console.error("Ошибка при выполнении fetch-запроса confirm:", error);
    }
  };

  useEffect(() => {
    if (payOptions.length > 0 && !selectedPay) {
      const defaultPay = payOptions[0];
      setSelectedPay(defaultPay);
      formStore.updateField("pay", defaultPay);
      formStore.updateField("payId", jsonData[defaultPay].id);
      formStore.updateForm("pay", defaultPay);
      formStore.updateForm("payId", jsonData[defaultPay].id);
      formStore.updateFormReceive("pay", defaultPay);
      formStore.updateFormReceive("payId", jsonData[defaultPay].id);
      console.log("Полученный курс", formStore.formConvert);
    }
  }, [payOptions]);

  useEffect(() => {
    if (selectedPay && receiveOptions.length > 0 && !selectedReceive) {
      const defaultReceive = receiveOptions[0];
      setSelectedReceive(defaultReceive);
      formStore.updateField("receive", defaultReceive);
      formStore.updateField("receiveId", jsonData[defaultReceive].id);
      formStore.updateForm("receive", defaultReceive);
      formStore.updateForm("receiveId", jsonData[defaultReceive].id);
      formStore.updateFormReceive("receive", defaultReceive);
      formStore.updateFormReceive("receiveId", jsonData[defaultReceive].id);
      console.log("Полученный курс", formStore.formConvert);
    }
  }, [selectedPay, receiveOptions]);

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   formStore.updateField(name, value);
  // };

  const scrollToTop = () => {
    const offset = (window.innerHeight * 19) / 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  const handlePaySelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formStore.updateField(name, value);
    formStore.updateForm("payValue", value);
    formStore.updateForm("paySelect", value);

    formStore.getCourse();
    formStore.setHandleChange();
  };

  const handleReceiveSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formStore.updateField(name, value);
    formStore.updateFormReceive("receiveValue", value);
    formStore.updateFormReceive("receiveSelect", value);
    formStore.getCourseReceive();
    formStore.setHandleChange();
  };

  const handlePaySelectChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    formStore.updateField("payValue", "");
    formStore.updateForm("payValue", "");
    formStore.updateForm("paySelect", "");
    formStore.updateFormReceive("paySelect", "");
    formStore.updateField("receiveValue", "");
    formStore.updateForm("receiveSelect", "");
    formStore.updateFormReceive("payValue", "");
    formStore.updateFormReceive("receiveSelect", "");
    formStore.updateField("paySelect", "");
    formStore.updateField("receiveSelect", "");
    const value = event.target.value;
    const name = event.target.name;
    const selectedPay = jsonData[value];
    setSelectedPay(value);
    formStore.updateField(name, value);
    formStore.updateField("payId", selectedPay.id);
    formStore.updateForm(name, value);
    formStore.updateForm("payId", selectedPay.id);
    formStore.updateFormReceive(name, value);
    formStore.updateFormReceive("payId", selectedPay.id);

    const firstReceiveOption = Object.keys(jsonData[value]?.directions)[0];
    const firstReceiveType = jsonData[firstReceiveOption].type;
    setSelectedReceive(firstReceiveOption);
    formStore.updateField("receive", firstReceiveOption);
    formStore.updateForm("receive", firstReceiveOption);
    formStore.updateFormReceive("receive", firstReceiveOption);
    formStore.updateField("receiveId", jsonData[firstReceiveOption].id);
    formStore.updateForm("receiveId", jsonData[firstReceiveOption].id);
    formStore.updateFormReceive("receiveId", jsonData[firstReceiveOption].id);

    let activeComponent = "";
    let direction = "";
    let directionReceive = "";

    if (firstReceiveType === "crypto" && selectedPay.type === "cash") {
      activeComponent = "cash-crypto";
      direction = "cash-crypto";
      directionReceive = "crypto-cash";
    } else if (firstReceiveType === "cash" && selectedPay.type === "crypto") {
      activeComponent = "crypto-cash";
      direction = "crypto-cash";
      directionReceive = "cash-crypto";
    } else if (firstReceiveType === "bank" && selectedPay.type === "crypto") {
      activeComponent = "crypto-bank";
      direction = "crypto-bank";
      directionReceive = "bank-crypto";
    } else if (firstReceiveType === "crypto" && selectedPay.type === "bank") {
      activeComponent = "bank-crypto";
      direction = "bank-crypto";
      directionReceive = "crypto-bank";
    } else if (firstReceiveType === "crypto" && selectedPay.type === "crypto") {
      activeComponent = "crypto-crypto";
      direction = "crypto-crypto";
      directionReceive = "crypto-crypto";
    }

    if (activeComponent && direction) {
      formStore.setActiveComponent(activeComponent);
      formStore.updateField("direction", direction);
      formStore.updateForm("direction", direction);
      formStore.updateFormReceive("direction", directionReceive);
    }
    formStore.getCourse();
    console.log("Полученный курс", formStore.formConvert);
  };

  const handleReceiveSelectChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    formStore.updateForm("payValue", "");
    formStore.updateForm("paySelect", "");
    formStore.updateFormReceive("paySelect", "");
    formStore.updateForm("receiveSelect", "");
    formStore.updateFormReceive("payValue", "");
    formStore.updateFormReceive("receiveSelect", "");
    formStore.updateField("paySelect", "");
    formStore.updateField("receiveSelect", "");
    const value = event.target.value;
    const name = event.target.name;
    formStore.updateField(name, value);
    setSelectedReceive(value);
    const selectedDirection = jsonData[selectedPay]?.directions[value];
    formStore.updateField("receiveId", selectedDirection.id);
    formStore.updateForm("receiveId", selectedDirection.id);

    if (selectedDirection) {
      setSelectedReceive(value);

      let activeComponent = "";
      let direction = "";
      let directionReceive = "";

      if (
        selectedDirection.type === "crypto" &&
        jsonData[selectedPay].type === "cash"
      ) {
        activeComponent = "cash-crypto";
        direction = "cash-crypto";
        directionReceive = "crypto-cash";
      } else if (
        selectedDirection.type === "cash" &&
        jsonData[selectedPay].type === "crypto"
      ) {
        activeComponent = "crypto-cash";
        direction = "crypto-cash";
        directionReceive = "cash-crypto";
      } else if (
        selectedDirection.type === "bank" &&
        jsonData[selectedPay].type === "crypto"
      ) {
        activeComponent = "crypto-bank";
        direction = "crypto-bank";
        directionReceive = "bank-crypto";
      } else if (
        selectedDirection.type === "crypto" &&
        jsonData[selectedPay].type === "bank"
      ) {
        activeComponent = "bank-crypto";
        direction = "bank-crypto";
        directionReceive = "crypto-bank";
      }

      if (activeComponent && direction) {
        formStore.setActiveComponent(activeComponent);
        formStore.updateField("direction", direction);
        formStore.updateForm("direction", direction);
        formStore.updateFormReceive("direction", directionReceive);
      }
      formStore.getCourse();
    }
  };

  const handleSubmit = () => {
    const validationResult = formStore.validateFields();

    if (validationResult) {
      console.log("Форма валидна, данные:", formStore.formData);
      console.log("Данные на курс:", formStore.formCourse);
      console.log("Полученный курс", formStore.formConvert);
      formStore.setDataValid(true);
      formStore.setIsPaid(0);
      poolsStore.setIsSubscribe(false);
      sendData();
      scrollToTop();
    } else {
      console.log("Ошибки валидации:", formStore.invalidInputs);
      formStore.dataValid = false;
    }
  };

  return (
    <div className={styles.form__exchanger}>
      <div className={styles.information__line}>
        <div className={styles.information__lightBox}></div>
        <div className={styles.main__informationLogo}>
          <img src={formHeaderImage} alt="" />
        </div>
      </div>
      <div className={styles.form__wrapper}>
        <div className={styles.form__header}>
          <div className={styles.pay__wrapper}>
            <div className={styles.form__headerPay}>Pay</div>
            <div className={styles.form__headerPayLine}></div>
            <div className={styles.form__pay}>
              <div className={styles.form__payValue}>
                <select
                  className={styles.form__paySelect}
                  name="pay"
                  value={selectedPay}
                  onChange={handlePaySelectChange}
                >
                  {payOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                      {<img src={jsonData[selectedPay]?.icon} />}
                    </option>
                  ))}
                </select>
                <img
                  src={PUBLIC_IMAGE + "arrowRight.svg"}
                  alt={"arrow"}
                  className={styles.form__receiveSelectImgArrow}
                />
                {selectedPay && (
                  <img
                    src={jsonData[selectedPay]?.icon}
                    alt={jsonData[selectedPay]?.cur_name}
                    className={styles.form__paySelectImg}
                  />
                )}
                <MyInput
                  name="paySelect"
                  className={styles.form__payInputValue}
                  onChange={handlePaySelect}
                  placeHolder="0"
                  isInvalid={formStore.invalidInputs.paySelect}
                  value={formStore.formCourse.paySelect}
                />
              </div>
              <div className={styles.form__payBottomInput}>
                <div
                  className={
                    formStore.formData.paySelect === "" ||
                    formStore.formData.receiveSelect === ""
                      ? styles.form__payExchangeRateNone
                      : styles.form__payExchangeRate
                  }
                >
                  Exchange rate
                  <div className={styles.form__payExchangeRateText}>
                    1 {jsonData[selectedPay]?.code} ={" "}
                    {formStore.isLoading
                      ? "Loading"
                      : !formStore.newCourse || Number(formStore.newCourse) === 0
                      ? "There is no exchange rate"
                      : parseFloat(formStore.formConvert.rate_format).toFixed(
                          8
                        )}{" "}
                    {jsonData[selectedPay]?.directions[selectedReceive]?.code}
                  </div>
                </div>
                <div className={styles.form__payLimits}>
                  <div className={styles.from__payInputWarning}>
                    <div
                      className={
                        formStore.validatePaySelectMin
                          ? styles.from__payInputWarningMin
                          : styles.from__payInputWarningMinNone
                      }
                    >
                      min.:{" "}
                      {formStore.isLoading
                        ? "Loading"
                        : parseFloat(
                            formStore.formConvert.exchangers.exchanger_main
                              .l_min
                          )
                            .toFixed(5)
                            .replace(/\.?0+$/, "")}{" "}
                      {jsonData[selectedPay]?.code}
                    </div>
                    <div
                      className={
                        formStore.validatePaySelectMax
                          ? styles.from__payInputWarningMax
                          : styles.from__payInputWarningMaxNone
                      }
                    >
                      max.:{" "}
                      {formStore.isLoading
                        ? "Loading"
                        : parseFloat(
                            formStore.formConvert.exchangers.exchanger_main
                              .l_max
                          )
                            .toFixed(5)
                            .replace(/\.?0+$/, "")}{" "}
                      {jsonData[selectedPay]?.code}
                    </div>
                  </div>
                  <div
                    className={
                      formStore.formData.paySelect === "" ||
                      formStore.formData.receiveSelect === ""
                        ? styles.form__iminExchangerNone
                        : styles.form__iminExchanger
                    }
                  >
                    min.:{" "}
                    {formStore.isLoading
                      ? "Loading"
                      : parseFloat(
                          formStore.formConvert.exchangers.exchanger_main.l_min
                        )
                          .toFixed(5)
                          .replace(/\.?0+$/, "")}{" "}
                    {jsonData[selectedPay]?.code}
                  </div>
                  <div
                    className={
                      formStore.formData.paySelect === "" ||
                      formStore.formData.receiveSelect === ""
                        ? styles.form__iminExchangerNone
                        : styles.form__iminExchanger
                    }
                  >
                    max.:{" "}
                    {formStore.isLoading
                      ? "Loading"
                      : parseFloat(
                          formStore.formConvert.exchangers.exchanger_main.l_max
                        )
                          .toFixed(5)
                          .replace(/\.?0+$/, "")}{" "}
                    {jsonData[selectedPay]?.code}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.form__headerLine}></div>
          <div className={styles.form__headerLine2}></div>
          <div className={styles.form__headerLine3}></div>
          <div className={styles.receive__wrapper}>
            <div className={styles.form__headerReceiveLine}></div>
            <div className={styles.form__headerReceive}>Receive</div>
            <div className={styles.form__headerReceiveLine}></div>
            <div className={styles.form__receive}>
              <div className={styles.form__receiveValue}>
                <select
                  className={styles.form__receiveSelect}
                  value={selectedReceive}
                  name="receive"
                  onChange={handleReceiveSelectChange}
                  disabled={!selectedPay}
                >
                  {receiveOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <img
                  src={PUBLIC_IMAGE + "arrowRight.svg"}
                  alt={"arrow"}
                  className={styles.form__receiveSelectImgArrow}
                />
                {selectedReceive && (
                  <img
                    src={
                      jsonData[selectedPay]?.directions[selectedReceive]?.icon
                    }
                    alt={
                      jsonData[selectedPay]?.directions[selectedReceive]?.name
                    }
                    className={styles.form__receiveSelectImg}
                  />
                )}
                <MyInput
                  name="receiveSelect"
                  className={styles.form__receiveInputValue}
                  onChange={handleReceiveSelect}
                  placeHolder="0"
                  value={formStore.formCourseReceive.receiveSelect}
                  isInvalid={formStore.invalidInputs.receiveSelect}
                />
              </div>
              <div className={styles.form__receiveLimits}>
                <div className={styles.form__receiveInputWarning}>
                  <div
                    className={
                      formStore.validateReceiveSelectMax
                        ? styles.form__receiveInputWarningMax
                        : styles.form__receiveInputWarningMaxNone
                    }
                  >
                    <div
                      className={
                        formStore.validateReceiveSelectMax
                          ? styles.form__iminExchanger
                          : styles.form__iminExchangerNone
                      }
                    >
                      max.:{" "}
                      {formStore.isLoading
                        ? "Loading"
                        : parseFloat(
                            formStore.formConvert.exchangers.exchanger_main
                              .r_max
                          ).toFixed(5)}{" "}
                      {jsonData[selectedPay]?.directions[selectedReceive]?.code}
                    </div>
                  </div>
                  <div
                    className={
                      formStore.validateReceiveSelectMin
                        ? styles.form__receiveInputWarningMin
                        : styles.form__receiveInputWarningMinNone
                    }
                  >
                    <div>
                      min.:{" "}
                      {formStore.isLoading
                        ? "Loading"
                        : parseFloat(
                            formStore.formConvert.exchangers.exchanger_main
                              .r_min
                          ).toFixed(5)}{" "}
                      {jsonData[selectedPay]?.directions[selectedReceive]?.code}
                    </div>
                  </div>
                </div>
                <div
                  className={
                    formStore.formData.paySelect === "" ||
                    formStore.formData.receiveSelect === ""
                      ? styles.form__iminExchangerNone
                      : styles.form__iminExchanger
                  }
                >
                  min.:{" "}
                  {formStore.isLoading
                    ? "Loading"
                    : parseFloat(
                        formStore.formConvert.exchangers.exchanger_main.r_min
                      ).toFixed(5)}{" "}
                  {jsonData[selectedPay]?.directions[selectedReceive]?.code}
                </div>
                <div
                  className={
                    formStore.formData.paySelect === "" ||
                    formStore.formData.receiveSelect === ""
                      ? styles.form__iminExchangerNone
                      : styles.form__iminExchanger
                  }
                >
                  max.:{" "}
                  {formStore.isLoading
                    ? "Loading"
                    : parseFloat(
                        formStore.formConvert.exchangers.exchanger_main.r_max
                      ).toFixed(5)}{" "}
                  {jsonData[selectedPay]?.directions[selectedReceive]?.code}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.form__body}></div>
        {formStore.activeComponent === "cash-crypto" && <FormBodyCashCrypto />}
        {formStore.activeComponent === "bank-crypto" && <FormBodyBankCrypto />}
        {formStore.activeComponent === "crypto-bank" && <FormBodyCryprtoBank />}
        {formStore.activeComponent === "crypto-cash" && <FormBodyCryptoCash />}
        {formStore.activeComponent === "crypto-crypto" && (
          <FormBodyCryptoCrypto />
        )}
      </div>
      <MyButton onClick={handleSubmit} className={styles.form__button}>
        EXCHANGE
      </MyButton>
      <div
        className={`${
          formStore.activeComponent === "cashCrypto" &&
          formStore.invalidInputs.paySelect
            ? styles.form__formBottomText
            : styles.form__formBottomTextNone
        }`}
      >
        The amount of cash must be at least $ 150,00
      </div>
      <div className={styles.form__bottomLine}>
        <div className={styles.form__externalLine}>
          <div className={styles.form__externalInsideLine}></div>
        </div>
      </div>
    </div>
  );
});

export default FormExchanger;
