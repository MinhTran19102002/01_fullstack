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



Huong dan chay du an
- Next-authjs
- Cac page la server render, con cac component la client render
- Cau truc project:

/frontend
├── app/                            # App Router (Next.js 14)
│   ├── layout.tsx                  # Layout chính (Header, Footer)
│   ├── page.tsx                    # Trang chính (Home)
│   ├── (admin)/                      # Trang "admin"
│   │   └── page.tsx
│   ├── (user)/                       # Trang "user"
│   │   └── page.tsx
│   ├── (auth)/                       # Trang "login/register"
│   │   └── page.tsx
│   └── globals.scss               # File SCSS toàn cục (nếu dùng SCSS)
│
├── components/                    # Các component dùng chung
│   ├── admin
│   ├── user
│   ├── auth
│   └── layout                     # Giao diên chung (header, footer, sider)
│
├── library/                    # 
│
├── provider/                    # 
│
├── routes/                    # 
│
├── types/                         # Các kiểu TypeScript dùng chung
│   └── ...
│
├── utils/                    # Các hàm tiện ích
│   ├── action                  # Các hàm call API
│   ├── api.ts                  # Custom API
│   └── cusuomHook.ts           # Custom Hook
│   └── errors.ts               # Custom auth error
│   └── util.ts                 # Các hàm dùng chung
│ 
├── styles/                        # Các file SCSS/Tailwind tùy chỉnh
│   ├── variables.scss             # Biến màu sắc, font,...
│   ├── mixins.scss                # Mixin SCSS (nếu cần)
│   └── tailwind.scss              # Tùy chỉnh Tailwind
│
├── public/                        # Ảnh, font, favicon,...
│   └── images/
│
├── lib/                           # Hàm tiện ích, service fetch API
│   ├── api.ts                     # Fetch wrapper hoặc axios instance
│   └── helpers.ts                 # Các hàm tiện ích nhỏ
│
├── .env.local                     # Biến môi trường
├── tailwind.config.js            # Cấu hình Tailwind
├── tsconfig.json                 # Cấu hình TypeScript
├── next.config.js                # Cấu hình Next.js
├── package.json
└── README.md



const session = await auth() dung cho server
