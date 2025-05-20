'use client'
import { getSeat } from "@/utils/actions/trip.action";
import React, { useEffect, useState } from "react";
import ModalSchedule from "./modal.schedule";
import { formatDateToVN } from "@/utils/util";



const MapBox = (data: any) => {
  const { seats, setSeats, selectedSeats, setSelectedSeats } = data
  const leftColumnSeats = seats.filter((seat: any) => seat.position.startsWith("A"));
  const rightColumnSeats = seats.filter((seat: any) => seat.position.startsWith("B"));

  const handleSeatClick = (position: string, status: string) => {
    if (status === "occupied" || status === "booking") {
      return
    }

    // Neu chon qua 8 cho thi khong cho chon nz
    // Them vao danh sach nhung ghe da chon
    if (status === "available") {
      if (selectedSeats.length === 8) {
        return
      }
      setSelectedSeats((prev: any) => [...prev, position]);
    } else {
      setSelectedSeats((prev: any) => prev.filter((seat: any) => seat !== position));
    }

    setSeats((prevSeats: any) =>
      prevSeats.map((seat: any) =>
        seat.position === position
          ? {
            ...seat,
            status: seat.status === 'available' ? 'selected' : 'available',
          } : seat
      )
    );
  };

  return (
    <div className="basis-2/3 grid grid-cols-2 gap-2 w-full rounded-lg p-5 bg-background h-fit" >
      <div className="flex flex-col items-center w-full">
        <h3 className="text-lg font-semibold mb-4">Tầng 1</h3>
        <div className="grid grid-cols-5 gap-4 border-4 border-blue-500 rounded-lg p-5 h-120 w-full">
          {leftColumnSeats.map(({ position, status }: Seat, index: number) => (
            <div
              key={position}
              onClick={() => handleSeatClick(position, status)}
              className={` text-center rounded cursor-pointer w-10 h-15 select-none
                    ${index < 15 && index % 3 === 1 ? 'col-start-3' :
                  index < 15 && index % 3 === 2 ? 'col-start-5' : ''}
                    ${status === 'available' ? 'bg-green-200 hover:bg-green-300'
                  : status === 'selected' ? 'bg-yellow-400 hover:bg-yellow-500'
                    : 'bg-red-500 '} `}
            >
              {position}
            </div>
          ))}
        </div>
      </div>

      {/* Cột bên phải */}
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">Tầng 2</h3>
        <div className="grid grid-cols-5 gap-4 border-4 border-blue-500 rounded-lg p-5 h-120 w-full">
          {rightColumnSeats.map(({ position, status }: Seat, index: number) => (
            <div
              key={index}
              onClick={() => handleSeatClick(position, status)}
              className={`text-center rounded cursor-pointer w-10 h-15 select-none
                    ${index < 15 && index % 3 === 1 ? 'col-start-3' :
                  index < 15 && index % 3 === 2 ? 'col-start-5' : ''}
                    ${status === 'available' ? 'bg-green-200 hover:bg-green-300'
                  : status === 'selected' ? 'bg-yellow-400 hover:bg-yellow-500'
                    : 'bg-red-500 '}`}
            >
              {position}
            </div>
          ))}
        </div>
      </div>
    </div>

    // thẻ thanh toán 
  );
};

export default MapBox;
