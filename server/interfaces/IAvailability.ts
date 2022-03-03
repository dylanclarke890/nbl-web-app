import ITimeSlot from "./ITimeSlot";

export default interface IAvailability {
  day: string;
  times: ITimeSlot[]
}