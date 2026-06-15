This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ⚙️ Logic xử lý Tự động Play/Pause khi cuộn (Auto-play on Scroll)

Ứng dụng sử dụng **Intersection Observer API** tích hợp cùng React `useRef` để tối ưu hóa hiệu năng phát video mà không gây lag trình duyệt. Logic hoạt động cụ thể như sau:

1. **Theo dõi tầm nhìn (Viewport Monitoring):**
   * Một bộ cấu hình `IntersectionObserver` được thiết lập tại Component cha (`page.tsx`) với thuộc tính `threshold: 0.6`. Điều này nghĩa là sự kiện chỉ kích hoạt khi một Video Card chiếm từ **60% diện tích màn hình** trở lên.

2. **Tự động Phát (Auto-play):**
   * Khi người dùng cuộn và một thẻ video lọt vào vùng kích hoạt (`entry.isIntersecting`), hàm callback sẽ tìm thẻ `<video>` bên trong Card đó và gọi lệnh `.play()`.
   * **Bypass chính sách bảo mật (Autoplay Policy):** Do các trình duyệt hiện đại chặn video có tiếng tự phát, tất cả video được đặt thuộc tính `muted={true}` mặc định khi khởi tạo để đảm bảo tính năng tự động phát hoạt động trơn tru.

3. **Tự động Dừng & Tua lại (Auto-pause & Reset):**
   * Ngay khi video bị cuộn khuất khỏi tầm nhìn (`isIntersecting === false`), lệnh `.pause()` sẽ được gọi lập tức để giải phóng tài nguyên hệ thống.
   * Đồng thời, thuộc tính `.currentTime = 0` được áp dụng để tua video về giây đầu tiên, sẵn sàng cho lần xem kế tiếp của người dùng.

4. **Đồng bộ với Tương tác Click:**
   * Trạng thái giao diện (State `isPlaying`) luôn được đồng bộ thông qua việc lắng nghe trực tiếp các sự kiện thực tế (`play`, `pause`) từ chính thẻ video thuần, giúp việc Click để Play/Pause thủ công không bị lệch nhịp với logic cuộn tự động.
