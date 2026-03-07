import { z } from "zod";

export const amountSchema = z
  .number()
  .positive("Số tiền phải lớn hơn 0")
  .max(1000000000, "Số tiền quá lớn");
