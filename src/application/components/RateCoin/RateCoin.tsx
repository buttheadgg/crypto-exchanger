import React, { FC } from 'react';
import styles from '../RateCoin/RateCoin.module.scss'

interface RateCoinProps{
    image: string;
    coinName: string;
    coinSecondName: string;
    coinPrice: string;
}

const RateCoin:FC<RateCoinProps> = ({image, coinName, coinSecondName, coinPrice}) => {
    return (
        <div className={styles.coin__main}>
            <div className={styles.coin__wrapper}>
                <div className={styles.coin__image}>
                    <img src={image}/>
                </div>
                <div className={styles.coin_title}>
                    <div className={styles.coin__name}> {coinName} </div>
                    <div className={styles.coin__secondName}> {coinSecondName} </div>
                </div>
                <div className={styles.coin__price}>
                    {coinPrice}
                </div>
            </div>
        </div>
    );
};

export default RateCoin;