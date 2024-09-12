type CurrencyRates<T extends string> = {
  [key in T]: number;
};

type CurrencyCode = 
  | "AUD" | "BGN" | "BRL" | "CAD" | "CHF" | "CNY" | "CZK" 
  | "DKK" | "GBP" | "HKD" | "HUF" | "IDR" | "ILS" | "INR" 
  | "ISK" | "JPY" | "KRW" | "MXN" | "MYR" | "NOK" | "NZD" 
  | "PHP" | "PLN" | "RON" | "SEK" | "SGD" | "THB" | "TRY" 
  | "USD" | "ZAR";


export const countryList: CurrencyRates<CurrencyCode> = {
  "AUD": 1.656,
  "BGN": 1.9558,
  "BRL": 6.2245,
  "CAD": 1.4997,
  "CHF": 0.9358,
  "CNY": 7.8534,
  "CZK": 25.088,
  "DKK": 7.4624,
  "GBP": 0.84375,
  "HKD": 8.6106,
  "HUF": 396.2,
  "IDR": 17020,
  "ILS": 4.1538,
  "INR": 92.74,
  "ISK": 152.7,
  "JPY": 156.6,
  "KRW": 1478.5,
  "MXN": 21.995,
  "MYR": 4.7816,
  "NOK": 11.937,
  "NZD": 1.7966,
  "PHP": 61.706,
  "PLN": 4.2873,
  "RON": 4.9742,
  "SEK": 11.435,
  "SGD": 1.4385,
  "THB": 37.198,
  "TRY": 37.557,
  "USD": 1.1043,
  "ZAR": 19.7394
};
