export default class Appointment {
  id: string;
  from: string;
  to: string;
  date?: Date;
  person?: { name?: string; phone?: string; email?: string };
  appointmentType?: string;

  public constructor(
    id: string,
    from: string,
    to: string,
    person?: { name?: string; phone?: string; email?: string },
    appointmentType?: string,
    date?: Date
  ) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.date = date;
    this.appointmentType = appointmentType;
    this.person = person;
  }

  public appointmentTime(sep: string): string {
    return `${this.from}${sep}${this.to}`;
  }
}
