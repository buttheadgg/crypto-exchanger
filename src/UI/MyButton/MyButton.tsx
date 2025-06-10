import React, { FC } from 'react';
import styles from './MyButton.module.scss';
import { PUBLIC_IMAGE } from '../../../constants';

interface ButtonProps{
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const MyButton:FC<ButtonProps> = ({children, onClick, className}) => {

    const leftImage = PUBLIC_IMAGE+'button-leftImage.svg';
    const rightImage = PUBLIC_IMAGE+'button-rightImage.svg';
    return (
        <button onClick={onClick} className={`${styles.myBtn} ${className || ''}`}  >
            <div className={styles.myBtn__wrapper}>
                <div className={styles.buttonImg}>
                    <div className={styles.leftImg}>
                        <img src={leftImage} alt="triangle" />
                    </div>
                    <div className={styles.rightImg}>
                        <img src={rightImage} alt="lightning" />
                    </div>
                    <div className={styles.myBtn__text}>
                    {children}
                    </div>
                </div>
            </div>
        </button>

    );
};

export default MyButton;