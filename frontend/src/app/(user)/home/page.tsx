
import ListTrip from "@/components/user/booking/ListTrip";
import Banner from "@/components/user/home/Banner";
import SearchBox from "@/components/user/home/SearchBox";


const Home = () => {
  return (
    <main >
      <div className="" >
        <Banner />
      </div>
      <div className="flex justify-center bg-sky-50 py-5 ">
        <SearchBox />
      </div>
      <div className="flex justify-center bg-sky-50 py-5 ">
        <ListTrip />
      </div>
    </main>

  )
}

export default Home;