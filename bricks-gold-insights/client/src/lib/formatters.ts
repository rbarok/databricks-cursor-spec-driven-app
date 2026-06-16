export const toNumber = (value: number | string | null | undefined): number =>
  value == null ? 0 : Number(value);

export const formatInteger = (value: number | string | null | undefined): string =>
  toNumber(value).toLocaleString();

export const formatCurrency = (value: number | string | null | undefined): string =>
  `$${toNumber(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const formatPercent = (value: number | string | null | undefined): string =>
  `${toNumber(value).toFixed(1)}%`;
