import BookingPage from "@/components/user/booking/BookingPage";
// import { useRouter } from 'next/navigation';

const booking = ({ params }: any) => {

  // const router = useRouter();
  return (
    <main >
      <div className=" ">
        <BookingPage id={params.id} />
      </div>

    </main>
  )
}
export default booking;