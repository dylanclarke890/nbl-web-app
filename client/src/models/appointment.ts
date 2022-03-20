import Treatment from "./treatment";

export default class Appointment {
  id: string;
  from: string;
  to: string;
  date?: Date;
  person?: { name?: string; phone?: string; email?: string };
  treatment?: Treatment;

  public constructor(
    id: string,
    from: string,
    to: string,
    person?: { name?: string; phone?: string; email?: string },
    treatment?: Treatment,
    date?: Date
  ) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.date = date;
    this.treatment = treatment;
    this.person = person;
  }

  public appointmentTime(sep: string): string {
    return `${this.from}${sep}${this.to}`;
  }
}
