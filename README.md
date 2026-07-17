# RLIP PRO 2.0 - AI Investment Research Platform

Đây là phiên bản MVP (Minimum Viable Product) của RLIP PRO 2.0.

## 🚀 Tính năng hiện tại
- Nhập Ticker (mã chứng khoán)
- Kéo dữ liệu tài chính tự động (hiện tại demo fallback 2023)
- Phân tích Feature Engineering (Tính ROIC)
- AI đưa ra luận điểm Bull/Bear case và điểm số đầu tư.

## 📦 Kiến trúc
- **Frontend:** React + Vite
- **Backend:** Vercel Serverless Functions (`api/analyze.ts`)
- **Database:** Supabase PostgreSQL (lưu `analysis_history`)

## 🛠 Hướng dẫn Deploy lên Vercel
Dự án đã được setup sẵn cho Vercel. 
1. Push code này lên một repository trên Github.
2. Tạo Project mới trên Vercel và import repo Github vừa tạo.
3. Trong phần **Environment Variables**, thêm các biến sau:
   - `VITE_SUPABASE_URL` = <Supabase Project URL>
   - `VITE_SUPABASE_ANON_KEY` = <Supabase Anon Key>
4. Bấm **Deploy**.
5. Vercel sẽ tự động build `npm run build` và deploy API Function cũng như thư mục `dist` của React.

> **Lưu ý:** Để database hoạt động, nhớ chạy file script `supabase/migrations/01_init.sql` trên tài khoản Supabase của bạn.
