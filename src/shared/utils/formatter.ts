export const formatCurrency = (value: number, currency = 'VND'): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(value / 100);
};
