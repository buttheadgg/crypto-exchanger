import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./application/stores/userStore";

export const Context = React.createContext(null as any);

const userStore = new UserStore()

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Context.Provider value={{ userStore }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
