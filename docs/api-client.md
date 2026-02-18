# Fetch API Custom Wrapper

## 1. Overview (Tổng quan)

Hàm http là một wrapper được xây dựng dựa trên Native Fetch API của Next.js. Mục đích là thay thế Axios để giảm bundle
size và tận dụng tối đa khả năng Caching/Revalidation của Next.js App Router.

## 2. Key Features (Tính năng chính)

- Type-safe: Hỗ trợ Generics để định nghĩa kiểu dữ liệu trả về.
- Base URL: Tự động đính kèm BASE_URL từ biến môi trường.
- Auto JSON parsing: Tự động parse response sang JSON (xử lý an toàn).
- Error Handling: Tự động bắt lỗi HTTP (4xx, 5xx) và throw Error với message
  từ API.
- Query Params: Hỗ trợ truyền params dạng object (giống Axios).

## 3. Usage (Cách sử dụng)

**Basic GET Request**

```
const data = await http<User[]>('/users');
```

**Request với Query Params & Cache (Next.js)**

```
const products = await http<Product[]>('/products', {
params: { category: 'laptop', limit: 10 },
next: { revalidate: 60 } // Cache trong 60 giây (Next.js feature)
});
```