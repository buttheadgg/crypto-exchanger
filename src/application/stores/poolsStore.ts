import { makeAutoObservable } from "mobx";
import { Pools } from "../components/types/types";
import { useRef } from "react";

class PoolsStore {
  formData: Pools = {};
  error: string | null = null;
  formDataPools: { [key: string]: any } = {
    coin: "",
    period: "",
    мatchAssets: "",
    amount: "",
    agreeConditions: "",
    autoSubscribe: "true",
    dateTime: "",
    predictDateTime: "",
    selectedProcent: "",
    walletAdress: "",
    qrHash: "",
    minValue: "",
    predictAmount: "",
  };
  isSubscribe: boolean | undefined = undefined;
  isConfirm: Number | undefined = undefined;
  invalidInputs: { [key: string]: boolean } = {};
  dataValid: boolean | undefined = false;
  isLoading: boolean = false;
  formRef: HTMLDivElement | null = null;
  periods: {
    period: string;
    apy: string;
    minPurchaseAmount: string;
    maxPurchaseAmountPerUser: string;
  }[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async fetchFormData() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(
        "https://alfa-crypto.com/api/v1/pool/currencies",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении данных");
      }

      const data: Pools = await response.json();
      console.log(data);
      this.formData = data;
    } catch (error) {
      this.error = "error message";
    } finally {
      this.isLoading = false;
    }
  }

  updateField(name: string, value: string | boolean) {
    this.formDataPools[name] = value;
  }

  setDataValid(component: boolean | undefined) {
    this.dataValid = component;
  }

  setIsSubscribe(component: boolean | undefined) {
    this.isSubscribe = component;
  }

  validateFields() {
    const newInvalidInputs: { [key: string]: boolean } = {};

    if (!this.formDataPools.agreeConditions) {
      newInvalidInputs.agreeConditions = true;
    }

    if (
      !this.formDataPools.amount ||
      isNaN(parseFloat(this.formDataPools.amount)) ||
      parseFloat(this.formDataPools.amount) <
        parseFloat(this.formDataPools.minValue) ||
      parseFloat(this.formDataPools.amount) === 0
    ) {
      newInvalidInputs.amount = true;
    }

    if (!this.formDataPools.walletAdress) {
      newInvalidInputs.walletAdress = true;
    }

    this.invalidInputs = newInvalidInputs;
    return Object.values(newInvalidInputs).every((isValid) => !isValid);
  }

  setIsConfirm(component: Number | undefined) {
    this.isConfirm = component;
  }
}

const poolsStore = new PoolsStore();
export default poolsStore;
