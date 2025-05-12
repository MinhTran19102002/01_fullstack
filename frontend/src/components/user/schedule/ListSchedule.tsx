'use client'
import { findSchedule } from '@/utils/actions/trip.action';
import { formatDateToVN } from '@/utils/util';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { LOCATIONS } from '@/components/admin/busRoute/modal.addBusRoute';
import { Datepicker } from 'flowbite-react';
import { ArrowDownCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import BusTripCard from './BusTripCard';





const ListSchedule = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [startDate, setStartDate] = useState<Date>(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });
  const [trips, setTrips] = useState<ITrip[]>([])



  const onSubmit = async (data: any) => {
    try {
      if (startDate !== null) {
        const res = await findSchedule({ day: startDate, ...data });

        if (res?.error) {
          // 
          return
        }
        if (res?.data?.data) {
          setTrips(res?.data?.data)
        }
      }

    } catch (error) {

    }
  }




  const callApi = async () => {
    try {
      if (startDate !== null) {
        const res = await findSchedule({ day: startDate });

        if (res?.error) {
          // 
          return
        }
        if (res?.data?.data) {
          // return res?.data?.data
          setTrips(res?.data?.data)
        }
      }

    } catch (error) {

    }
  }



  useEffect(() => {
    callApi()
  }, [])


  return (
    <div className='container-width flex flex-col gap-2'>
      <div className=" grid  w-full border-custom-box rounded-2xl shadow-md bg-white">
        <form className="w-full h-full space-y-4 grid grid-cols-4 items-center justify-center "
          onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ngày</label>

            <DatePicker
              selected={startDate}
              onChange={(date) => {
                if (date) {
                  date.setHours(0, 0, 0, 0);
                  setStartDate(date);
                }
              }}
              dateFormat="dd/MM/yyyy"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="max-w-sm p-4" >
            <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-2">Điểm đi</label>
            <select id="departure"
              {...register('departure')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option selected value={""}>Chọn địa điểm</option>
              {LOCATIONS.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>


          <div className="max-w-sm p-4" >
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">Điểm đến</label>
            <select id="destination"
              {...register('destination')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option selected value={""}>Chọn địa điểm</option>
              {LOCATIONS.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="buttom-submit bg-my-gradient h-10 hover:cursor-pointer"
          >
            Tìm kiếm
          </button>
        </form>
      </div>

      <div className=" grid grid-cols-1 items-center w-full border-custom-box rounded-2xl shadow-md bg-white min-h-40">
        {trips.length === 0 ? <p className=' text-center'>Không có chuyến đi nào</p>
          : trips.map((trip) => (
            <div
              key={trip._id}
              // onClick={() => onBooking(trip)}
              className="border-2 border-gray-300 rounded-3xl p-4 m-5 select-none shadow-sm hover:shadow-md transition-all"
            >
              <BusTripCard trip={trip} />
            </div>
          ))}
      </div>


    </div>


  )
}

export default ListSchedule;