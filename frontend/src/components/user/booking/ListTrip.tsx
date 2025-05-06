'use client';

import { useState } from 'react';

export default function ListTrip() {
  const [routes] = useState([
    { id: 1, from: 'Hà Nội', to: 'Hải Phòng', time: '08:00', price: '150.000đ' },
    { id: 2, from: 'Hà Nội', to: 'Đà Nẵng', time: '14:00', price: '450.000đ' },
    { id: 3, from: 'Hà Nội', to: 'TP.HCM', time: '19:30', price: '800.000đ' },
  ]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Danh sách tuyến xe</h1>
      <div className="grid gap-4">
        {routes.map((route) => (
          <div key={route.id} className="border p-4 rounded-lg shadow-md">
            <p><strong>Tuyến:</strong> {route.from} → {route.to}</p>
            <p><strong>Giờ khởi hành:</strong> {route.time}</p>
            <p><strong>Giá vé:</strong> {route.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
