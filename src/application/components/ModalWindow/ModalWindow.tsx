import React, { Children, FC } from "react";
import styles from "./ModalWindow.module.scss";
import { observer } from "mobx-react-lite";
import formStore from "../../stores/formStore";

interface ModalWindowProps {
  children: React.ReactNode;
}

const ModalWindow: FC<ModalWindowProps> = observer(({ children }) => {
  return (
    <>
      <div
        className={`${
          formStore.dataValid
            ? styles.modal__wrapper
            : styles.modal__wrapperNone
        }` }
      >
        {" "}
        {children}
      </div>
      <div
        className={`${
          formStore.dataValid
            ? styles.modal__overlay
            : styles.modal__overlayNone
        }`}
      ></div>
    </>
  );
});

export default ModalWindow;
