export function formatPrice(value: number | string) {
  const number = Number(value);
  if (Number.isNaN(number)) return `R$ ${value}`;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: number % 1 === 0 ? 0 : 2,
  }).format(number);
}
