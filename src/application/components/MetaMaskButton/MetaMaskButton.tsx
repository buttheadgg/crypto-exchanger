import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Context } from "../../..";

const MetaMaskButton = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { userStore } = useContext(Context);
  // Проверка, подключён ли уже MetaMask
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        });
    }
  }, []);

  // Подключение к MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        userStore.setWallet(accounts[0]);
      } catch (err: any) {
        console.error("MetaMask connection error:", err);

        if (err.code === 4001) {
          alert("Вы отменили подключение к MetaMask.");
        } else {
          alert(
            `Ошибка подключения MetaMask: ${
              err.message || "неизвестная ошибка"
            }`
          );
        }
      }
    }
  };

  return (
    <div>
      {walletAddress ? (
        <p>
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </p>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask</button>
      )}
    </div>
  );
};

export default MetaMaskButton;
