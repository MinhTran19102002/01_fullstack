// app/components/BusTripCard.tsx
'user client'

import { formatHourToVN, formatDayToVN } from "@/utils/util";
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const BusTripCard = (data: any) => {
  const { trip }: { trip: ITrip } = data
  const [count, setCount] = useState(0)
  const router = useRouter();
  const setData = () => {
    if (trip) {
      const availableSlots = (trip.slots ?? []).filter(slot => slot.status === 'available').length;
      setCount(availableSlots)
    }
  }
  useEffect(() => {
    setData()
  }, [trip])


  const onBooking = () => {
    router.push(`/booking/${trip._id}`); // ⚠ Bạn cần đọc từ router trong trang booking
  };


  return (
    <div className="mx-2">
      <div className="flex justify-between items-center mb-2 gap-10">
        <div className="basis-3/4 flex flex-col">
          <div className="flex items-center justify-between gap-4 ">
            <span className="text-3xl font-bold text-center leading-none">{formatHourToVN(trip.departure_time)}
              <br />
              <span className="font-normal text-xl leading-none">({formatDayToVN(trip.departure_time)})</span>
              <br />
              <span className="text-xl font-normal">{trip.is_outbound ? trip.busRoute?.departure : trip.busRoute?.destination}</span>
            </span>
            <div className="flex w-full items-center">
              <TruckIcon className="w-5 h-5 text-green-500" />
              <span className="flex-1 border-b-2 border-dotted text-gray-500"></span>
              <span className="text-gray-500 text-center"> {trip.busRoute?.estimatedTime} giờ ({trip.busRoute?.distance} km)<br />
                <span className="text-[13px]">(Asian/Ho Chi Minh)</span>
              </span>
              <span className="flex-1 border-b-2 border-dotted"></span>
              <MapPinIcon className="w-5 h-5 text-green-500" />

            </div>
            <span className="text-3xl font-bold text-center leading-none">{formatHourToVN(trip.arrival_time)}
              <br />
              <span className="font-normal text-xl">({formatDayToVN(trip.departure_time)})</span>
              <br />
              <span className="text-xl font-normal">{trip.is_outbound ? trip.busRoute?.destination : trip.busRoute?.departure}</span>
            </span>
          </div>
        </div>
        <div className="text-right basis-1/4 border-l-1 border-dashed border-gray-500 h-full">
          <p className="text-sm text-gray-500">{trip.bus?.type === 'bed' ? 'Giường nằm' : 'Ghế ngồi'} • <span className="text-green-600 font-medium">{count} chỗ trống</span></p>
          <p className="text-red-600 font-bold text-lg">{trip.price?.toLocaleString('vi-VN')} đ</p>
        </div>
      </div>



      <hr className="my-2" />

      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex gap-4">
          <button className="hover:underline">Chọn ghế</button>
          <button className="hover:underline">Lịch trình</button>
          <button className="hover:underline">Trung chuyển</button>
          <button className="hover:underline">Chính sách</button>
        </div>
        <button
          onClick={onBooking}
          className="space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition hover:cursor-pointer">
          Chọn chuyến
        </button>
      </div>
    </div>
  );
}


export default BusTripCard;