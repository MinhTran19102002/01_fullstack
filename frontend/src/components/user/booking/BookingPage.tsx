'use client'

import { getSeat } from "@/utils/actions/trip.action";
import { useEffect, useState } from "react";
import InforBox from "./InforBox";
import ModalSchedule from "./modal.schedule";
import PayBox from "./PayBox";
import MapBox from "./MapBox";

const BookingPage = (data: any) => {
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

  return (
    <div className="flex justify-center mt-6">
      <div className="container-width flex gap-4">
        {/*Cot 1*/}
        <MapBox seats={seats} setSeats={setSeats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
        {/* Cot 2 */}
        <div className="basis-1/3  flex flex-col  justify-center gap-4 h-fit">
          {/* Thong tin luot di */}
          <InforBox trip={trip} setIsModalOpen={setIsModalOpen} />
          <PayBox selectedSeats={selectedSeats} trip={trip} />
          <ModalSchedule isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
    </div>
  )
}

export default BookingPage;