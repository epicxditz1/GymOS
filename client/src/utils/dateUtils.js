export function getExpiryStatus(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffInDays = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 0) return "🔴 Expired";

  if (diffInDays <= 7) {
    return `🟠 ${diffInDays} day(s) left`;
  }

  return `🟢 Active (${diffInDays} day(s) left)`;
}