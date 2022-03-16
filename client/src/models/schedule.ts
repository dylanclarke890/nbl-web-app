import Availability from "./availability";

export default class Schedule {
  id: string;
  name: string;
  starts: Date;
  availability: Availability[];
  ends?: Date;

  public constructor(
    id: string,
    name: string,
    starts: Date,
    availability: Availability[],
    ends?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.starts = starts;
    this.availability = availability;
    this.ends = ends;
  }
}
