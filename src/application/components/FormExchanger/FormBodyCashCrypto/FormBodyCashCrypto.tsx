import React, {
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./FormBodyCashCrypto.module.scss";
import MyInput from "../../UI/MyInput/MyInput";
import { PUBLIC_IMAGE } from "../../../constants";
import formStore from "../../../stores/formStore";
import { observer } from "mobx-react-lite";
import locationStore from "../../../stores/locationStore";
import { LocationData } from "../../types/types";
import ReCAPTCHA from "react-google-recaptcha";
import { Context } from "../../../..";

const FormBodyCashCrypto: React.FC = () => {
  const { selectedCountry, selectedCity, setCountry, setCity, locationData } =
    locationStore;

  const handleCaptchaChange = (token: string | null) => {
    formStore.setCaptchaToken(token);
    console.log("CAPTCHA token:", token);
  };

  const { userStore } = useContext(Context);

  useEffect(() => {
    locationStore.initializeDefaults();
  }, []);

  const countryOptions = Object.keys(locationData);
  const cityOptions = locationStore.cityOptions;

  const handleCountrySelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setCountry(value);
    formStore.updateField(name, value);
    formStore.getCourse();
    formStore.getCourseReceive();
  };

  const handleCitySelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value; // "Moscow" или "Saint-Petersburg"
    const name = event.target.name;

    setCity(value);

    // Определяем cityId по названию
    let cityId = "";
    if (value === "Moscow") {
      cityId = "1";
    } else if (value === "Saint-Petersburg") {
      cityId = "2";
    }

    // Обновляем сторы
    formStore.updateField(name, value); // name = "city"
    formStore.updateForm(name, value);
    formStore.updateFormReceive(name, value);

    // Отдельно передаём cityId
    formStore.updateField("cityId", cityId);
    formStore.updateForm("cityId", cityId);
    formStore.updateFormReceive("cityId", cityId);

     formStore.getCourse();
    // formStore.getCourseReceive();
  };

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
              name="walletAddress"
              onChange={handleChange}
              isInvalid={formStore.invalidInputs.walletAddress}
            />
          </div>
          <div className={styles.form__receiveInputWrapper}>
            <div className={styles.form__receiveInput}>
              <p className={styles.form__receiveInputLable}>Country*</p>
              <select
                value={selectedCountry}
                onChange={handleCountrySelectChange}
                name="country"
                className={styles.form__inputCountry}
              >
                {countryOptions.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.form__receiveInput}>
              <p className={styles.form__receiveInputLable}>City*</p>
              <select
                value={selectedCity}
                onChange={handleCitySelectChange}
                className={styles.form__inputCity}
                name="city"
              >
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
            <div className={styles.form__PhoneInputWrapper}>
              <p className={styles.form__PhoneInputLabel}>Phone number</p>
              <MyInput
                className={styles.form__PhoneInput}
                placeHolder="Phone number"
                name="phone"
                onChange={handleChange}
              />
            </div>
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
          sitekey="6Ldks2ArAAAAAMuyPWUlOSaDgkC2NCL2nUieTwjs"
          onChange={handleCaptchaChange}
          theme="light"
        />
      </div>
    </div>
  );
};

export default observer(FormBodyCashCrypto);
