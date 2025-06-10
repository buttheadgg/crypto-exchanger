import { useState, useEffect, useCallback } from 'react';
import { ethers, BrowserProvider } from 'ethers';

export function useMetaMask() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Инициализация провайдера
  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new BrowserProvider(window.ethereum);
      setProvider(web3Provider);

      // Обработчик смены аккаунта
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || '');
      });

      // Обработчик смены сети
      window.ethereum.on('chainChanged', (chainHex: string) => {
        setChainId(parseInt(chainHex, 16));
        // При смене сети рекомендовано перезагружать страницу:
        // window.location.reload();
      });
    } else {
      setError('MetaMask не обнаружен');
    }

    // Очистка обработчиков
    return () => {
      window.ethereum?.removeListener('accountsChanged', () => {});
      window.ethereum?.removeListener('chainChanged', () => {});
    };
  }, []);

  // Запрос доступа к аккаунтам
  const connect = useCallback(async () => {
    if (!provider) {
      setError('Провайдер не инициализирован');
      return;
    }
    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      const network = await provider.getNetwork();
      setChainId(Number(network.chainId));
      setError('');
    } catch (err: any) {
      setError(err.message || 'Ошибка подключения');
    }
  }, [provider]);

  return { provider, account, chainId, error, connect };
}
