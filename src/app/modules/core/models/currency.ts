export enum Currency {
  PEN = 'PEN',
  USD = 'USD',
}

export const CurrencyDict: Record<Currency, string> = {
  [Currency.PEN]: 'S/.',
  [Currency.USD]: '$',
};
