'use client'

import { formatDateToVN } from "@/utils/util";

const InforBox = (data: any) => {

  const { trip, setIsModalOpen } = data

  return (
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
  )
}

export default InforBox;