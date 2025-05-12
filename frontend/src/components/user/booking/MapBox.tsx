'use client'
import { getSeat } from "@/utils/actions/trip.action";
import React, { useEffect, useState } from "react";
import ModalSchedule from "./modal.schedule";
import { formatDateToVN } from "@/utils/util";



const BusSeatMap = (data: any) => {
  const { id } = data

  const [trip, setTrip] = useState<ITrip>(); // data khi ghe lay tu backend
  const [loading, setLoading] = useState(true)
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);  //Danh sach ghe da chon
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seats, setSeats] = useState<Seat[]>([]);



  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("check")
      const res = await getSeat(id); // ← Đổi thành API của bạn
      if (res && 'data' in res && res.data && res.data.slots) {
        setSeats(res.data.slots)
        setTrip(res.data)
        return
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
    if (status === "occupied" || status === "booking") {
      return
    }

    // Neu chon qua 8 cho thi khong cho chon nz
    // Them vao danh sach nhung ghe da chon
    if (status === "available") {
      if (selectedSeats.length === 8) {
        return
      }
      setSelectedSeats(prev => [...prev, position]);
    } else {
      setSelectedSeats(prev => prev.filter(seat => seat !== position));
    }

    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.position === position
          ? {
            ...seat,
            status: seat.status === 'available' ? 'selected' : 'available',
          } : seat
      )
    );
  };

  const renderSeats = (seats: Seat[]) => {
    const leftColumnSeats = seats.filter(seat => seat.position.startsWith("A"));
    const rightColumnSeats = seats.filter(seat => seat.position.startsWith("B"));

    return (
      <div className="basis-2/3 grid grid-cols-2 gap-2 w-full rounded-lg p-5 bg-background h-fit" >
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
            {rightColumnSeats.map(({ position, status }, index) => (
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

  return (
    <div className="flex justify-center mt-6">

      <div className="container-width flex gap-4">
        {/* Cột bên trái */}
        {renderSeats(seats)}
        {/* Cột bên phải */}
        <div className="basis-1/3  flex flex-col  justify-center gap-4 h-fit">
          {/* Thông tin  lượt đi */}
          <div className="rounded-lg p-5 bg-background w-full h-fit flex flex-col gap-1 justify-self-center ">
            <h3 className="text-xl font-bold  text-textdef">Thông tin lượt đi</h3>
            <div className="mt-4 flex justify-between">
              <span className="font-medium text-textdef">Tuyến xe</span>
              <span className="text-right font-medium text-textdef">
                {trip?.is_outbound
                  ? trip?.busRoute?.departure + '-' + trip?.busRoute?.destination
                  : trip?.busRoute?.departure + '-' + trip?.busRoute?.destination}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-textdef">Thời gian xuất bến</span>
              <span className="text-right font-medium text-textdef">
                {trip ? formatDateToVN(trip.departure_time) : ''}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-textdef">Thời gian tới nơi</span>
              <span className="text-right font-medium text-textdef">
                {trip ? formatDateToVN(trip.arrival_time) : ''}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-textdef">Quãng đường</span>
              <span className="text-right font-medium text-textdef">
                {trip?.busRoute?.distance + ' km'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-textdef">Giá vé</span>
              <span className="text-right font-medium text-textdef">
                {trip?.price?.toLocaleString('vi-VN') + ' đ'}
              </span>
            </div>
            <div>
              <label className="font-medium text-textdef underline cursor-pointer" onClick={() => setIsModalOpen(true)}>Lộ trình</label>
            </div>
          </div>



          {/* Thông tin đặt ghế */}
          <div className=" rounded-lg p-5 bg-background  w-full h-fit flex flex-col justify-self-center ">
            <h3 className="text-xl font-bold  text-textdef">Thanh toán</h3>
            <form className="w-full h-fit grid grid-rows-none gap-1 ">
              {/* Danh sách ghế */}
              {/* <div className="grid grid-row"> */}
              <div className="mt-4 flex justify-between ">
                <label className="font-medium text-textdef">Ghế đã chọn:</label>
                <span className="font-medium text-textdef"> {selectedSeats.length + ' Ghế'}</span>
              </div>
              <div className="flex gap-2 w-full h-7">
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
              <div className="flex items-center justify-between">
                <label className="font-medium text-textdef">Tổng tiền:</label>
                <p className="mt-1 text-lg font-semibold text-red-600">
                  {/* {totalPrice.toLocaleString()} VNĐ */}
                  {trip ? (selectedSeats.length * trip.price).toLocaleString() + 'đ' : '0'}
                </p>
              </div>


              {/* Nút xác nhận */}
              <button
                type="submit"
                className="w-8/12 buttom-submit bg-my-gradient h-10 mt-4 "
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
