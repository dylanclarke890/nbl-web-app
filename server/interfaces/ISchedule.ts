import IAvailability from "./IAvailability";

export default interface ISchedule {
  _id: string;
  name: string;
  starts: Date;
  ends?: Date;
  runsIndefinitely: boolean;
  availability: IAvailability[];
}
