import { makeAutoObservable } from "mobx";

export default class UserStore {
  _user: Record<string, any>;
  _isAuth: boolean;
  _wallet: string = "";

  constructor() {
    this._user = {};
    this._isAuth = false;

    makeAutoObservable(this);

    // Чтение из localStorage при инициализации
    const savedAuth = localStorage.getItem("isAuth");
    const savedLogin = localStorage.getItem("login");

    if (savedAuth === "true") {
      this._isAuth = true;
      this._user = { login: savedLogin };
    }
  }

  async fetchAuth(login: string, password: string): Promise<boolean> {
    try {
      const response = await fetch("https://obmen.vip/api/v1/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.ok && data.status === "ok") {
        this.setIsAuth(true);
        this.setUser({ login });

        // Сохраняем в localStorage
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("login", login);

        return true;
      } else {
        this.setIsAuth(false);
        return false;
      }
    } catch (error) {
      console.error("Auth error:", error);
      this.setIsAuth(false);
      return false;
    }
  }

  logout() {
    this._isAuth = false;
    this._user = {};

    localStorage.removeItem("isAuth");
    localStorage.removeItem("login");
  }

  setUser(user: Record<string, any>) {
    this._user = user;
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  get user() {
    return this._user;
  }

  get isAuth() {
    return this._isAuth;
  }

  setWallet(address: string) {
    this._wallet = address;
  }

  get wallet() {
    return this._wallet;
  }
}
