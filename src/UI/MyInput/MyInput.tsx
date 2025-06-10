import React, { FC } from "react";
import styles from "./MyInput.module.scss";

interface InputProps {
  value?: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  placeHolder?: string;
  name?: string;
  isInvalid?: boolean;
}

const MyInput: FC<InputProps> = ({
  value,
  onChange,
  className,
  type,
  placeHolder,
  name,
  isInvalid
}) => {
  return (
    <div className={`${styles.myInput__wrapper} ${className || ""}`}>
        <input
          value={value}
          onChange={onChange}
          className={`${isInvalid ? styles.myInputInvalid : styles.myInput} ${className || ""}`}
          type={type}
          placeholder={placeHolder}
          name={name}
        />
    </div>
  );
};

export default MyInput;
