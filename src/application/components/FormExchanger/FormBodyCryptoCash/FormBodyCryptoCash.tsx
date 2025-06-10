import React, { ChangeEvent, FC, useEffect, useState } from "react";
import MyInput from "../../UI/MyInput/MyInput";
import { PUBLIC_IMAGE } from "../../../constants";
import styles from "./FormBodyCryptoCash.module.scss";
import { observer } from "mobx-react-lite";
import formStore from "../../../stores/formStore";
import locationStore from "../../../stores/locationStore";
import ReCAPTCHA from "react-google-recaptcha";

const FormBodyCryptoCash: FC = ({}) => {
  const { selectedCountry, selectedCity, setCountry, setCity, locationData } =
    locationStore;

  const handleCaptchaChange = (token: string | null) => {
    formStore.setCaptchaToken(token);
    console.log("CAPTCHA token:", token);
  };

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
    const value = event.target.value;
    const name = event.target.name;
    setCity(value);
    formStore.updateField(name, value);
    formStore.updateForm(name, value)
    formStore.updateFormReceive(name, value)
    formStore.getCourse();
    formStore.getCourseReceive();
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formStore.updateField(name, value);
  };

  const recaptchaImage = PUBLIC_IMAGE + "reCAPTCHA.svg";

  return (
    <div className={styles.form__body}>
      <div className={styles.form__bodyWrapper}>
        <div className={styles.form__pay}>
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
          <div className={styles.form__inputNameWrapper}>
            <p className={styles.form__form__inputNameLabel}>Name</p>
            <MyInput
              name="name"
              className={styles.form__inputName}
              placeHolder="Name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.form__inputSurnameWrapper}>
            <p className={styles.form__form__inputSurnameLabel}>Last Name</p>
            <MyInput
              name="surname"
              className={styles.form__inputSurname}
              placeHolder="Name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.form__receive}>
          <div className={styles.form__receiveWrapper}>
            <div className={styles.form__EmailInputWrapper}>
              <p className={styles.form__EmailInputLabel}>E-mail*</p>
              <MyInput
                name="email"
                className={styles.form__EmailInput}
                placeHolder="E-mail"
                onChange={handleChange}
                isInvalid={formStore.invalidInputs.email}
              />
            </div>
            <div className={styles.form__PhoneInputWrapper}>
              <p className={styles.form__PhoneInputLabel}>Phone number</p>
              <MyInput
                name="phone"
                className={styles.form__PhoneInput}
                placeHolder="Phone number"
                onChange={handleChange}
              />
            </div>
            <div className={styles.form__payInput}>
              <p className={styles.form__payInputLable}>Telegram</p>
              <MyInput
                name="telegram"
                className={styles.form__payInputTelegram}
                placeHolder="Telegram"
                onChange={handleChange}
              />
            </div>
            <div className={styles.form__receiveCheckbox}>
              <div className={styles.remember__data}>
                <input
                  name="rememberData"
                  type="checkbox"
                  className={styles.form__checkbox}
                  id="checkbox1"
                  onChange={handleChange}
                />
                <div className={styles.form__checkboxText}>
                  Do not remember data
                </div>
              </div>
              <div className={styles.agree__rules}>
                <input
                  name="agreeToRules"
                  type="checkbox"
                  className={styles.form__checkbox}
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

export default observer(FormBodyCryptoCash);
