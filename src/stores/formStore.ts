import { makeAutoObservable } from "mobx";

class FormStore {
  formData: { [key: string]: any } = {
    pay: "",
    payId: "",
    receive: "",
    receiveId: "",
    paySelect: "",
    receiveSelect: "",
    country: "",
    countryId: "",
    city: "",
    cityId: "",
    name: "",
    surname: "",
    phone: "",
    email: "",
    telegram: "",
    walletAddress: "",
    btcWalletAddress: "",
    rememberData: "",
    agreeToRules: "",
    direction: "crypto-crypto",
    changer_id: "1071",
    isPayd: "no",
    transactionId: "",
  };

  formCourse: { [key: string]: any } = {
    pay: "",
    payId: "93",
    payValue: "",
    receive: "",
    receiveId: "10",
    receiveValue: "",
    cityId: " ",
    direction: "crypto-crypto",
  };
  formCourseReceive: { [key: string]: any } = {
    pay: "",
    payId: "93",
    payValue: "",
    receive: "",
    receiveId: "10",
    receiveValue: "",
    cityId: "",
    direction: "crypto-crypto",
  };
  formConvert: { [key: string]: any } = {};
  finalData: { [key: string]: any } = {};
  receiveMin: string = "";
  invalidInputs: { [key: string]: boolean } = {};
  activeComponent: string = "crypto-crypto";
  dataValid: boolean | undefined = false;
  isPaid: Number | undefined = undefined;
  newCourse = 0;
  minReserve = 0;
  isLoading: boolean = false;
  isValidate: boolean | null = null;
  captchaToken: string | null = null;
  validatePaySelectMax: boolean = false;
  validatePaySelectMin: boolean | undefined = false;
  validateReceiveSelectMax: boolean = false;
  validateReceiveSelectMin: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCaptchaToken(value: string | null) {
    this.captchaToken = value;
  }

  updateField(name: string, value: string | boolean) {
    this.formData[name] = value;
  }
  
  updateForm(name: string, value: string | boolean) {
    this.formCourse[name] = value;
  }
  updateFormReceive(name: string, value: string | boolean) {
    this.formCourseReceive[name] = value;
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  updateFormConvert(newData: { [key: string]: any }) {
    this.formConvert = newData;
    if (newData.exchangers) {
      this.formData.exchangers = newData.exchangers;
    }
  }


  updateFinalData(name: string, value: string | boolean | Record<string, any>) {
    if (typeof value === "object" && value !== null) {
      this.finalData = {
        ...this.finalData,
        ...value,
      };
    } else {
      this.finalData[name] = value;
    }
  }

  async getCourse() { 
    if (this.formCourse.direction == "crypto-bank" || this.formCourse.direction == "bank-crypto" || this.formCourse.direction == "crypto-crypto"  ){
      this.updateForm("cityId","");
    }
    this.setIsLoading(true); 
    try {
      const res = await fetch("https://alfa-crypto.com/api/v1/exchange/get_rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formStore.formCourse),
      });
      const result = await res.json();
      this.formConvert = result;
      this.newCourse = this.formConvert.rate_format;
      this.formCourseReceive.receiveSelect = this.newCourse * this.formCourse.payValue;
      this.formData.receiveSelect = this.newCourse * this.formCourse.payValue;
      this.formData.receiveSelect = String(this.formData.receiveSelect)
      this.updateFormConvert(this.formConvert)
      this.setHandleChange();
    } catch (error) {
      console.error("Ошибка при выполнении fetch-запроса rate:");
    } finally {
      this.setIsLoading(false);
    }
  }

  async getCourseReceive() {
    if (this.formCourseReceive.direction == "crypto-bank" || this.formCourseReceive.direction == "bank-crypto" || this.formCourseReceive.direction == "crypto-crypto" ){
      this.updateFormReceive("cityId","");
    }
    this.setIsLoading(true);
    try {
      const res = await fetch("https://alfa-crypto.com/api/v1/exchange/get_rate_receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formStore.formCourseReceive),
      });
      const result = await res.json();
      this.formConvert = result;
      this.newCourse = this.formConvert.rate_format;
      this.formCourse.paySelect = this.newCourse * this.formCourseReceive.receiveValue;
      this.formData.paySelect = this.newCourse * this.formCourseReceive.receiveValue;
      this.setHandleChange();
    } catch (error) {
      console.error("Ошибка при выполнении fetch-запроса rate:");
    } finally {
      this.setIsLoading(false);
    }
  }

  updateInput(name: string, value: string | number) {
    this.formData[name] = value;
    this.formCourse[name] = value;
    this.formCourseReceive[name] = value;
  }

  setReceiveMin(component: string) {
    this.receiveMin = component;
  }

  setActiveComponent(component: string) {
    this.activeComponent = component;
  }

  setIsPaid(component: Number | undefined) {
    this.isPaid = component;
  }

  setDataValid(component: boolean | undefined) {
    this.dataValid = component;
  }

  validateFields() {
    const newInvalidInputs: { [key: string]: boolean } = {};

    if (
      !this.formData.email ||
      !this.validateEmail(this.formData.email as string)
    ) {
      newInvalidInputs.email = true;
    }

    if (this.captchaToken == null) {
      newInvalidInputs.captcha = true;
    }

    if (
      parseFloat(this.formData.paySelect) > Number(this.formConvert.l_max)
    ) {
      newInvalidInputs.paySelect = true;
      this.validatePaySelectMax = true;
      this.validatePaySelectMin = false;
    } else if (
      parseFloat(this.formData.paySelect) === 0 || 
      parseFloat(this.formData.paySelect) < Number(this.formConvert.l_min)
    ) {
      newInvalidInputs.paySelect = true;
      this.validatePaySelectMin = true;
      this.validatePaySelectMax = false;
    }else if (
      !this.formData.paySelect ||
      isNaN(parseFloat(this.formData.paySelect))
    ){
      newInvalidInputs.paySelect = true;
      this.validatePaySelectMin = false;
      this.validatePaySelectMax = false;
    }else
    {
      this.validatePaySelectMin = false;
      this.validatePaySelectMax = false;
    }

    if (
      parseFloat(this.formCourseReceive.receiveSelect) > Number(this.formConvert.r_max)
    ) {
      newInvalidInputs.receiveSelect = true;
      this.validateReceiveSelectMax = true;
      this.validateReceiveSelectMin = false;
    }else if (
      parseFloat(this.formData.receiveSelect) < Number(this.formConvert.r_min) ||
      parseFloat(this.formData.receiveSelect) === 0
    ){
      newInvalidInputs.receiveSelect = true;
      this.validateReceiveSelectMax = false;
      this.validateReceiveSelectMin = true;
    }else{
      this.validateReceiveSelectMax = false;
      this.validateReceiveSelectMin = false;
    }

    if (this.activeComponent === "cash-crypto") {
      if (!this.formData.walletAddress) {
        newInvalidInputs.walletAddress = true;
      }
      if (!this.formData.country) {
        newInvalidInputs.country = true;
      }
      if (!this.formData.city) {
        newInvalidInputs.city = true;
      }
    }

    if (this.activeComponent === "bank-crypto") {
      if (!this.formData.btcWalletAddress) {
        newInvalidInputs.btcWalletAddress = true;
      }
      if (!this.formData.cardNumber) {
        newInvalidInputs.cardNumber = true;
      }
    }

    if (this.activeComponent === "crypto-bank") {
      if (!this.formData.country) {
        newInvalidInputs.country = true;
      }
      if (!this.formData.city) {
        newInvalidInputs.city = true;
      }
    }

    if (this.activeComponent === "crypto-cash") {
      if (!this.formData.country) {
        newInvalidInputs.country = true;
      }
      if (!this.formData.city) {
        newInvalidInputs.city = true;
      }
    }

    if (this.activeComponent === "crypto-crypto") {
      if (!this.formData.btcWalletAddress) {
        newInvalidInputs.btcWalletAddress = true;
      }
    }

    this.invalidInputs = newInvalidInputs;
    return Object.values(newInvalidInputs).every((isValid) => !isValid);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  setHandleChange() {
    this.isValidate = this.validateFields();
    if (!this.isValidate) {
      this.dataValid = false;
    }
  }
}

const formStore = new FormStore();
export default formStore;
