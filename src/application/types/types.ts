export interface Direction {
  id: string;
  name: string;
  icon: string;
  min: string;
  max: string;
  reserve: string;
  type: string;
  code: string;
}

export interface Directions {
  [key: string]: Direction;
}

export interface Currency {
  directions: Directions;
  cur_name: string;
  icon: string;
  id: string;
  min: string;
  max: string;
  type: string;
  rate: string;
  code: string
}

export interface JsonData {
  [key: string]: Currency;
}

export interface formDataInterface {
  paySelect?: string;
  receiveSelect?: string;
  country?: string;
  city?: string;
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  walletAddress?: string;
  btcWalletAddress?: string;
  rememberData?: boolean;
  agreeToRules?: boolean;
}

export interface City {
  [city: string]: string;
}

export interface LocationData {
  [country: string]: City;
}

export interface Period {
  period: string;
  apy: string;
  minPurchaseAmount: string;
  maxPurchaseAmountPerUser: string;
}

export interface Detail {
  apyRange: string[];
  duration: string;
  highestApy: string;
  periods: Period[];
}
export interface Pools {
  [key: string]: {
    detail: Detail;
  };
}

export interface Transaction {
  datetime: string;
  sender: string;
  receiver: string;
  currency_from: string;
  amount_from: string;
  currency_to: string;
  amount_to: string;
  exchange_rate: string;
}

export interface TransactionsData {
  [key: string]: Transaction;
}

export interface DiagramItem {
  name: string;
  value: string;
}

export interface StatisticsData {
  yesterday_count: string;
  total_volumes: string;
  total_count: string;
  yesterday_volumes: string;
  diagram: DiagramItem[];
}

export interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, handler: (...args: any[]) => void) => void;
  removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
