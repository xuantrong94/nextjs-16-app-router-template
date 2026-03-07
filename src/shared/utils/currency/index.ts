import { amountSchema } from "./schema";

const EXCHANGE_RATE = 27000;

export const convertUsdToVnd = (usd: number): number => {
  // 1. Validate đầu vào
  const validatedUsd = amountSchema.parse(usd);

  // 2. Làm tròn USD đến 2 chữ số thập phân (chuẩn tài chính)
  const roundedUsd = Math.round(validatedUsd * 100) / 100;

  // 3. Chuyển đổi
  const vndRaw = roundedUsd * EXCHANGE_RATE;

  // 4. Làm tròn đến hàng nghìn (VND thường không dùng tiền lẻ dưới 1000đ)
  // Công thức: Math.round(x / 1000) * 1000
  return Math.round(vndRaw / 1000) * 1000;
};
