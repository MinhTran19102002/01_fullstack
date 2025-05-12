'use client'
const PayBox = (data: any) => {
  const { selectedSeats, trip } = data
  return (
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
          {selectedSeats.map((seat: string) => (
            <span
              // key={index}
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
    </div>
  )
}

export default PayBox;