// app/payment-info/page.tsx

'use client';

import React from 'react';

const paymentData = {
  name: 'Nguyễn Văn A',
  phone: '0901234567',
  email: 'nguyenvana@example.com',
  selectedSeats: ['A1', 'A2'],
  amount: 200000,
  status: 'Chờ thanh toán',
  paymentTime: '2025-05-19 22:00',
};

const PaymentInfor = () => {
  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-semibold mb-4">Thông tin thanh toán</h1>
      <div className="space-y-2 text-base">
        <p><strong>Họ tên:</strong> {paymentData.name}</p>
        <p><strong>Số điện thoại:</strong> {paymentData.phone}</p>
        <p><strong>Email:</strong> {paymentData.email}</p>
        <p><strong>Ghế đã chọn:</strong> {paymentData.selectedSeats.join(', ')}</p>
        <p><strong>Số tiền:</strong> {paymentData.amount.toLocaleString()} VND</p>
        <p><strong>Trạng thái:</strong> <span className="text-yellow-600">{paymentData.status}</span></p>
        <p><strong>Thời gian đặt:</strong> {paymentData.paymentTime}</p>
      </div>
    </div>
  );
}

export default PaymentInfor;
