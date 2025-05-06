// /pages/404.js
'use client'

// /app/not-found/page.tsx

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg flex flex-col gap-10">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="text-lg text-gray-600">Trang bạn tìm không tồn tại.</p>
        <a
          href="/auth/login"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
};

export default Custom404;
