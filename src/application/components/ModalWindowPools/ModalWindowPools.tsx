import React, { Children, FC } from "react";
import { observer } from "mobx-react-lite";
import poolsStore from "../../stores/poolsStore";
import styles from './ModalWindowPools.module.scss'

interface ModalWindowProps {
  children: React.ReactNode;
}

const ModalWindowPools: FC<ModalWindowProps> = observer(({ children }) => {
  return (
    <>
      <div
        className={`${
          poolsStore.isSubscribe
            ? styles.modal__wrapper
            : styles.modal__wrapperNone
        }` }
      >
        {" "}
        {children}
      </div>
      <div
        className={`${
            poolsStore.isSubscribe
            ? styles.modal__overlay
            : styles.modal__overlayNone
        }`}
      ></div>
    </>
  );
});

export default ModalWindowPools;
