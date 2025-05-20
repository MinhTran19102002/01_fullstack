'use client'

import { payment } from "@/utils/actions/payment.action";
import { getUser } from "@/utils/actions/user.action";
import { notification } from "antd";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PayBox = (data: any) => {
  const { selectedSeats, trip } = data
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm();
  const router = useRouter()

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {

    const session = await getUser()

    setValue("name", session?.user.name)
    setValue("phone", session?.user.phone)
    setValue("email", session?.user.email)
  }


  const onSubmit = async (data: any) => {
    if (selectedSeats.length === 0) {
      notification.error({
        message: 'Đặt chỗ thất bại',
        description: 'Bạn cần chọn chỗ ngồi',
      });
    }

    const value = { ...data, selectedSeats, tripId: trip._id }
    const res = await payment(value)
    if (res?.error) {
      notification.error({
        message: 'Đặt chỗ thất bại',
        description: res?.message,
      });
      // 
      return
    }
    console.log(res)
    if (res?.data) {
      window.location.href = res.data;
    }

    return
  }

  //   notification.error({
  //   message: 'Add bus error',
  //   description: res?.message,
  // });
  return (
    <div className=" rounded-lg p-5 bg-background  w-full h-fit flex flex-col justify-self-center ">
      <h3 className="text-xl font-bold  text-textdef">Thanh toán</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-fit grid grid-rows-none gap-1 ">
        {/* Danh sách ghế */}
        <div className="mt-4 flex justify-between ">
          <label className="font-medium text-textdef">Ghế đã chọn:</label>
          <span className="font-medium text-textdef"> {selectedSeats.length + ' Ghế'}</span>
        </div>
        <div className="flex gap-2 w-full h-7">
          {selectedSeats.map((seat: string) => (
            <span
              // key={index}
              className="inline-flex items-center justify-center w-8 h-6  bg-green-600 rounded-full text-sm"
            >
              {seat}
            </span>

          ))}
        </div>
        <div className="flex justify-between items-center gap-1">
          <label className="font-medium text-textdef basis-1/3">Tên:</label>
          <input
            type="text"
            placeholder="Vui lòng nhập tên"
            {...register('name', { required: true })}
            className=" basis-2/3 border rounded px-2 py-1 mt-1  placeholder:text-sm"
          />
        </div>

        <div className="flex justify-between items-center gap-1">
          <label className="font-medium text-textdef basis-1/3">SĐT:</label>
          <input
            type="text"
            placeholder="Vui lòng nhập số điện thoại"
            {...register('phone', { required: true })}
            className=" basis-2/3 border rounded px-2 py-1 mt-1  placeholder:text-sm"
          />
        </div>
        <div className="flex justify-between items-center gap-1">
          <label className="font-medium text-textdef basis-1/3">Email:</label>
          <input
            type="text"
            placeholder="Vui lòng nhập địa chỉ email"
            {...register('email', { required: true })}
            className=" basis-2/3 border rounded px-2 py-1 mt-1  placeholder:text-sm"
          />
        </div>


        {/* Giá tiền */}
        <div className="flex items-center justify-between">
          <label className="font-medium text-textdef">Tổng tiền:</label>
          <p className="mt-1 text-lg font-semibold text-red-600">
            {trip ? (selectedSeats.length * trip.price).toLocaleString() + 'đ' : '0'}
          </p>
        </div>


        {/* Nút xác nhận */}
        <button
          type="submit"
          className="w-8/12 buttom-submit bg-my-gradient h-10 mt-4 hover:cursor-pointer"
        >
          Xác nhận thanh toán
        </button>
      </form>
    </div>
  )
}

export default PayBox;