import React, { ChangeEvent, FC, useEffect } from "react";
import MyInput from "../../UI/MyInput/MyInput";
import styles from "./FormBodyBankCrypto.module.scss";
import { PUBLIC_IMAGE } from "../../../constants";
import formStore from "../../../stores/formStore";
import { observer } from "mobx-react-lite";
import locationStore from "../../../stores/locationStore";
import ReCAPTCHA from "react-google-recaptcha";

const FormBodyBankCrypto: FC = ({}) => {
  const { selectedCountry, selectedCity, setCountry, setCity, locationData } =
    locationStore;

  const handleCaptchaChange = (token: string | null) => {
    formStore.setCaptchaToken(token);
    console.log("CAPTCHA token:", token);
  };

  useEffect(() => {
    locationStore.fetchLocationData();
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
            <p className={styles.form__walleyInputLable}> Card number* </p>
            <MyInput
              placeHolder="Card number"
              className={styles.form__walletInput}
              onChange={handleChange}
              name="cardNumber"
              isInvalid={formStore.invalidInputs.cardNumber}
            />
          </div>
          <div className={styles.form__payInput}>
            <p className={styles.form__payInputLable}>
              {" "}
              {formStore.formData.receive} wallet address*
            </p>
            <MyInput
              className={styles.form__payInputTelegram}
              placeHolder={`${formStore.formData.receive} wallet address`}
              onChange={handleChange}
              name="btcWalletAddress"
              isInvalid={formStore.invalidInputs.btcWalletAddress}
            />
          </div>
          <div className={styles.form__payInput}>
            <p className={styles.form__payInputLable}>Telegram</p>
            <MyInput
              className={styles.form__payInputTelegram}
              placeHolder="Telegram"
              onChange={handleChange}
              name="telegram"
            />
          </div>
        </div>
        <div className={styles.form__receive}>
          <div className={styles.form__receiveWrapper}>
            <div className={styles.form__PhoneInputWrapper}>
              <p className={styles.form__PhoneInputLabel}>Phone number</p>
              <MyInput
                className={styles.form__PhoneInput}
                placeHolder="Phone number"
                onChange={handleChange}
                name="phone"
              />
            </div>
            <div className={styles.form__EmailInputWrapper}>
              <p className={styles.form__EmailInputLabel}>E-mail*</p>
              <MyInput
                className={styles.form__EmailInput}
                placeHolder="E-mail"
                onChange={handleChange}
                name="email"
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

export default observer(FormBodyBankCrypto);
