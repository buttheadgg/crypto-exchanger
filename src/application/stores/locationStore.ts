import { makeAutoObservable, runInAction } from "mobx";
import { LocationData } from "../components/types/types";
import formStore from "./formStore";

class LocationStore {
  selectedCountry = "";
  selectedCity = "";
  locationData: LocationData = {};
  error: string | null = null;
  constructor() {
    makeAutoObservable(this);

    this.setCountry = this.setCountry.bind(this);
    this.setCity = this.setCity.bind(this);
  }

  async fetchLocationData() {
    this.error = null;
    try {
      const response = await window.fetch(
        "https://alfa-crypto.com/api/v1/exchange/cities"
      );

      const data: LocationData = await response.json();

      runInAction(() => {
        this.locationData = data;
      });
    } catch {
      this.error = "Failed to fetch location data";
    }
  }

  setCountry(country: string) {
    this.selectedCountry = country;
    const cities = this.cityOptions;
    if (cities.length > 0) {
      this.setCity(cities[0]);
      const cityId = this.findCityId(this.selectedCountry, cities[0]);
      formStore.updateField("cityId", cityId);
      formStore.updateForm("cityId", cityId);
      formStore.updateFormReceive("cityId", cityId);
    }
    formStore.updateField("country", country);
  }

  setCity(city: string) {
    this.selectedCity = city;
    const cityId = this.findCityId(this.selectedCountry, city);
    formStore.updateField("city", city);
    formStore.updateField("cityId", cityId);
   formStore.updateForm("cityId", cityId);
   formStore.updateFormReceive("cityId", cityId);
  }

  findCityId(country: string, city: string): string {
    if (this.locationData[country] && this.locationData[country][city]) {
      return this.locationData[country][city];
    }
    return "";
  }

  get cityOptions(): string[] {
    return this.selectedCountry && this.locationData[this.selectedCountry]
      ? Object.keys(this.locationData[this.selectedCountry])
      : [];
  }

  async initializeDefaults() {
    if (Object.keys(this.locationData).length === 0) {
      await this.fetchLocationData();
    }
    
    const countries = Object.keys(this.locationData);
    if (countries.length > 0) {
      this.setCountry(countries[0]);
    }
  }
}

const locationStore = new LocationStore();
export default locationStore;
