'use client';

import { useState } from 'react';

export default function SearchBox() {
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');

  return (
    <div className="container-width  border-custom-box mx-auto my-8 p-6  rounded-2xl shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-800">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="tripType"
              checked={tripType === 'oneway'}
              onChange={() => setTripType('oneway')}
              className="text-orange-500"
            />
            <span className="text-orange-500 font-semibold">Một chiều</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="tripType"
              checked={tripType === 'roundtrip'}
              onChange={() => setTripType('roundtrip')}
            />
            <span>Khứ hồi</span>
          </label>
        </div>
        <div className="text-orange-600 font-medium text-sm cursor-pointer">Hướng dẫn mua vé</div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Điểm đi</label>
          <input
            type="text"
            value="TP. Hồ Chí Minh"
            className="w-full border rounded-md px-4 py-3 font-semibold text-lg"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Điểm đến</label>
          <div className="relative flex items-center">
            <input
              type="text"
              value="An Giang"
              className="w-full border rounded-md px-4 py-3 font-semibold text-lg"
              readOnly
            />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-1 text-orange-500">
              ⇄
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Ngày đi</label>
          <input
            type="text"
            value="03/05/2025"
            className="w-full border rounded-md px-4 py-3 font-semibold text-lg"
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">Thứ 7</p>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Số vé</label>
          <div className="relative">
            <input
              type="number"
              value={1}
              className="w-full border rounded-md px-4 py-3 font-semibold text-lg"
              readOnly
            />
            <span className="absolute top-3 right-3 text-gray-400 pointer-events-none">▼</span>
          </div>
        </div>
      </div>

      {/* Recent searches */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Tìm kiếm gần đây</p>
        <div className="flex gap-4">
          <div className="border rounded-md px-4 py-2 bg-gray-100 text-sm">
            <p className="font-medium">TP. Hồ Chí Minh - An Giang</p>
            <p className="text-xs text-gray-500">25/04/2025</p>
          </div>
          <div className="border rounded-md px-4 py-2 bg-gray-100 text-sm">
            <p className="font-medium">An Giang - Bà Rịa - Vũng Tàu</p>
            <p className="text-xs text-gray-500">26/04/2025</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="text-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3 rounded-full">
          Tìm chuyến xe
        </button>
      </div>
    </div>
  );
}
