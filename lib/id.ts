export function createId() {
  const random = Math.random().toString(36).slice(2, 10);
  return `res_${Date.now()}_${random}`;
}
