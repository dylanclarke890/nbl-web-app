import IAvailability from './IAvailability'

export default interface ISchedule {
  name : string;
  starts: Date,
  ends: Date,
  availability: IAvailability[];
}