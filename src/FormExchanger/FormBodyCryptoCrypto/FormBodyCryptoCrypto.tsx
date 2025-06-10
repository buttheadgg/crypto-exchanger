import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./FormBodyCryptoCrypto.module.scss";
import MyInput from "../../UI/MyInput/MyInput";
import locationStore from "../../../stores/locationStore";
import formStore from "../../../stores/formStore";
import { PUBLIC_IMAGE } from "../../../constants";
import ReCAPTCHA from 'react-google-recaptcha';

const FormBodyCryptoCrypto = () => {
    
  const handleCaptchaChange = (token: string | null) => {
    formStore.setCaptchaToken(token);
    console.log("CAPTCHA token:", token);
  };

  useEffect(() => {
    locationStore.initializeDefaults();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formStore.updateField(name, value);
    formStore.setHandleChange();
  };

  const recaptchaImage = PUBLIC_IMAGE + "reCAPTCHA.svg";

  return (
    <div className={styles.form__body}>
      <div className={styles.form__bodyWrapper}>
        <div className={styles.form__pay}>
          <div className={styles.form__walletInputWrapper}>
            <p className={styles.form__walleyInputLable}>
              {" "}
              Wallet {formStore.formData.receive} for receiver*{" "}
            </p>
            <MyInput
              placeHolder={`${formStore.formData.receive} Wallet address`}
              className={styles.form__walletInput}
              name="btcWalletAddress"
              onChange={handleChange}
              isInvalid={formStore.invalidInputs.btcWalletAddress}
            />
          </div>
          <div className={styles.form__receiveInputWrapper}></div>
          <div className={styles.form__payInput}>
            <p className={styles.form__payInputLable}>Telegram</p>
            <MyInput
              className={styles.form__payInputTelegram}
              placeHolder="Telegram"
              name="telegram"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.form__receive}>
          <div className={styles.form__receiveWrapper}>
            <div className={styles.form__EmailInputWrapper}>
              <p className={styles.form__EmailInputLabel}>E-mail*</p>
              <MyInput
                className={styles.form__EmailInput}
                placeHolder="E-mail"
                name="email"
                onChange={handleChange}
                isInvalid={formStore.invalidInputs.email}
              />
            </div>
            <div className={styles.form__receiveCheckbox}>
              <div className={styles.remember__data}>
                <input
                  type="checkbox"
                  className={styles.form__checkbox}
                  id="checkbox1"
                  name="rememberData"
                  onChange={handleChange}
                />
                <div className={styles.form__checkboxText}>
                  Do not remember data
                </div>
              </div>
              <div className={styles.agree__rules}>
                <input
                  type="checkbox"
                  className={styles.form__checkbox}
                  name="agreeToRules"
                  onChange={handleChange}
                  defaultChecked={true}
                />
                <div className={styles.form__checkboxText}>
                  By clicking the Exchange button,<br></br>I agree to the{" "}
                  <a href="#" className={styles.rulesLink}>
                    rules
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.form__reCapcha}>
      <ReCAPTCHA
        sitekey="6LffE8IqAAAAAM3RixTIrXWK--794V01rKbaJCio" 
        onChange={handleCaptchaChange}
        theme="light" 
      />
      </div>
    </div>
  );
};

export default FormBodyCryptoCrypto;
