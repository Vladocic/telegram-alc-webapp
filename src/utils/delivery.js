export function calculateDelivery(total, threshold = 5000, base = 250) {
  return total >= threshold ? 0 : base;
}