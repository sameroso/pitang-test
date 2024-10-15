import { CurrenciesDTO } from "@/services/currency-service";

export const transformBaseCurrencyRate = (
  currency: CurrenciesDTO,
  baseCurrency: string,
) => {
  const baseCurrencyValue = currency.rates[currency.base] || 0;
  const desiredBaseCurrencyValue = currency.rates[baseCurrency] || 1;

  return baseCurrencyValue / desiredBaseCurrencyValue;
};

const converToBRLRate = (currency: CurrenciesDTO, val: number) => {
  return transformBaseCurrencyRate(currency, "BRL") * val;
};

export const mapCurrencyToTableValues = (currencyRates: CurrenciesDTO) => {
  return Object.entries(currencyRates?.rates || {}).map(
    ([currency, value]) => ({
      currency,
      value: converToBRLRate(currencyRates, value) as number,
      date: currencyRates.date || "",
    }),
  );
};
