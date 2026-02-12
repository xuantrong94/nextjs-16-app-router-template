import { convertUsdToVnd } from './index';

describe('convertUsdToVnd()', () => {
  test('chuyển đổi đúng tỷ lệ cơ bản 1 USD = 27,000 VND', () => {
    expect(convertUsdToVnd(1)).toBe(27000);
  });

  test('làm tròn USD đến 2 chữ số thập phân trước khi nhân', () => {
    // 1.004 -> 1.00 USD -> 27,000 VND
    expect(convertUsdToVnd(1.004)).toBe(27000);
    // 1.006 -> 1.01 USD -> 27,270 VND -> làm tròn hàng nghìn -> 27,000 VND
    expect(convertUsdToVnd(1.006)).toBe(27000);
  });

  test('làm tròn kết quả VND đến hàng nghìn', () => {
    // 1.25 USD * 27000 = 33,750 -> làm tròn lên 34,000
    expect(convertUsdToVnd(1.25)).toBe(34000);
  });

  test('ném ra lỗi nếu input là số âm (Zod validation)', () => {
    expect(() => convertUsdToVnd(-10)).toThrow('Số tiền phải lớn hơn 0');
  });
});
