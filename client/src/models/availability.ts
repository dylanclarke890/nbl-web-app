import ITimeSlot from "../interfaces/ITimeSlot";

export default class Availability {
  day: string;
  times: ITimeSlot[];

  public constructor(day: string, times: ITimeSlot[]) {
    this.day = day;
    this.times = times;
  }
}
