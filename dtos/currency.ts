export interface CurrenciesDTO {
  success: boolean;
  timestamp: number;
  historical: boolean;
  base: string;
  date: string;
  rates: Record<string, number>;
}
