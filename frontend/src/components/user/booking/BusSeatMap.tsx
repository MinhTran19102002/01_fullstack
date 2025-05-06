'use client'
import { getSeat } from "@/utils/actions/trip.action";
import React, { useEffect, useState } from "react";
import ModalSchedule from "./modal.schedule";

type Seat = {
  position: string;
  status: string;
};

const generateSeats = () => {
  const initialSeats: Seat[] = [];
  for (let i = 0; i < 20; i++) {
    initialSeats.push({ position: `A${i < 10 ? "0" + i : i}`, status: "available" });
    initialSeats.push({ position: `B${i < 10 ? "0" + i : i}`, status: "available" });
  }
  return initialSeats;
};

const BusSeatMap = () => {

  const [seatsData, setSeatsData] = useState<any[]>([]); // data khi ghe lay tu backend
  const [loading, setLoading] = useState(true)
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);  //Danh sach ghe da chon
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [seats, setSeats] = useState<Seat[]>(() => generateSeats());
  const [seats, setSeats] = useState<Seat[]>([]);



  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("check")
      const res = await getSeat(); // ← Đổi thành API của bạn
      // if (res && 'data' in res && res.data) {
      //   const list = res.data.data; // OK!
      //   setDataSource(list);
      // }
      // return
      if (res) {
        setSeats(res)
      }

      // Assumes response is an array
    } catch (error) {
      console.error('Lỗi gọi API:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [])

  const handleSeatClick = (position: string, status: string) => {
    if (status === "available") {
      setSelectedSeats(prev => [...prev, position]);
    } else {
      setSelectedSeats(prev => prev.filter(seat => seat !== position));
    }

    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.position === position
          ? {
            ...seat,
            status: seat.status === 'available' ? 'booking' : 'available',
          } : seat
      )
    );
  };

  const renderSeats = (seats: Seat[]) => {
    const leftColumnSeats = seats.filter(seat => seat.position.startsWith("A"));
    const rightColumnSeats = seats.filter(seat => seat.position.startsWith("B"));

    return (
      <div className="grid grid-cols-2 gap-2 w-full" >
        <div className="flex flex-col items-center w-full">
          <h3 className="text-lg font-semibold mb-4">Tầng 1</h3>
          <div className="grid grid-cols-5 gap-4 border-4 border-blue-500 rounded-lg p-5 h-120 w-full">
            {leftColumnSeats.map(({ position, status }, index) => (
              <div
                key={position}
                onClick={() => handleSeatClick(position, status)}
                className={` text-center rounded cursor-pointer w-10 h-15 select-none
                    ${index < 15 && index % 3 === 1 ? 'col-start-3' :
                    index < 15 && index % 3 === 2 ? 'col-start-5' : ''}
                    ${status === 'available' ? 'bg-green-200 hover:bg-green-300'
                    : status === 'booking' ? 'bg-yellow-400 hover:bg-yellow-500'
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
            {rightColumnSeats.map(({ position, status }, index) => (
              <div
                key={index}
                onClick={() => handleSeatClick(position, status)}
                className={`text-center rounded cursor-pointer w-10 h-15 select-none
                    ${index < 15 && index % 3 === 1 ? 'col-start-3' :
                    index < 15 && index % 3 === 2 ? 'col-start-5' : ''}
                    ${status === 'available' ? 'bg-green-200 hover:bg-green-300'
                    : status === 'booking' ? 'bg-yellow-400 hover:bg-yellow-500'
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

  return (
    <div className="flex justify-center mt-6">

      <div className="container-width grid grid-cols-2 gap-4">
        {/* Cột bên trái */}
        {renderSeats(seats)}
        {/* Cột bên phải */}
        <div className=" flex flex-col items-center justify-center h-130">
          <div className="rounded-lg p-5 bg-background text-white w-9/12 h-full gap-5 flex flex-col justify-self-center ">
            <h3 className="text-xl font-bold  text-textdef">Thanh toán</h3>
            <form className="w-full h-full space-y-4 grid grid-rows-none">
              {/* Danh sách ghế */}
              {/* <div className="grid grid-row"> */}
              <div>
                <label className="font-medium text-textdef">Ghế đã chọn:</label>

              </div>
              <div className="mt-2 grid grid-flow-col grid-rows-4 gap-2 w-full h-30">
                {selectedSeats.map((seat, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center justify-center w-8 h-6  bg-green-600 rounded-full text-sm"
                  >
                    {seat}
                  </span>
                ))}
              </div>

              {/* Giá tiền */}
              <div>
                <label className="font-medium text-textdef">Tổng tiền:</label>
                <p className="mt-1 text-lg font-semibold text-yellow-400">
                  {/* {totalPrice.toLocaleString()} VNĐ */}
                </p>
              </div>

              {/* Thông tin tuyến */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-textdef">Điểm đi:</label>
                  <p className="mt-1"></p>
                </div>
                <div>
                  <label className="font-medium text-textdef">Điểm đến:</label>
                  <p className="mt-1"></p>
                </div>
              </div>

              {/* Giờ */}
              <div>
                <label className="font-medium text-textdef">Giờ khởi hành:</label>
                <p className="mt-1"></p>
              </div>

              <div>
                <label className="font-medium text-textdef underline cursor-pointer" onClick={() => setIsModalOpen(true)}>Lộ trình</label>
              </div>

              {/* Nút xác nhận */}
              <button
                type="submit"
                className="w-8/12 bg-my-gradient text-white font-bold py-2 px-4 rounded justify-self-center h-10"
              >
                Xác nhận thanh toán
              </button>
            </form>
            {/* Modal overlay */}
            <ModalSchedule isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default BusSeatMap;
