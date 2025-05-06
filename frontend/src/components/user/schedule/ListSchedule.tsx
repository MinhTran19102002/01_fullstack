'use client'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ListSchedule = () => {

  const [startDate, setStartDate] = useState<Date | null>(new Date());


  const onChangeHour = (date: any) => {
    if (date) {
      const onlyDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // 00:00:00
      console.log(onlyDate)
      setStartDate(onlyDate);
    } else {
      setStartDate(null);
    }

  }

  return (
    <div className='container-width flex flex-col  gap-2'>
      <div className=" grid  mx-auto border-custom-box rounded-2xl shadow-md bg-white">
        <div className="max-w-sm p-4 justify-self-end">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ngày</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => onChangeHour(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className=" grid  mx-auto  border-custom-box rounded-2xl shadow-md bg-white min-h-40">
        {/* <div className="max-w-sm p-4 justify-self-end">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ngày</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => onChangeHour(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
      </div>

    </div>
  )
}

export default ListSchedule;