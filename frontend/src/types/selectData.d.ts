type UserOption = {
  _id: string;
  name: string;
  email: string
};

type BusRouteOption = {
  _id: string;
  departure: string;
  destination: string;
  estimatedTime: number;
  priceForSleep: number;
  priceForSeat: number;
}
type BusOption = {
  _id: string;
  licensePlate: string;
  type: string;
  name: string
}