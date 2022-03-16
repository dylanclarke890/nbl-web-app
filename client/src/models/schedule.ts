import Availability from "./availability";

export default class Schedule {
  _id: string;
  name: string;
  starts: Date;
  availability: Availability[];
  ends?: Date;

  public constructor(
    _id: string,
    name: string,
    starts: Date,
    availability: Availability[],
    ends?: Date,
  ) {
    this._id = _id;
    this.name = name;
    this.starts = starts;
    this.availability = availability;
    this.ends = ends;
  }
}
