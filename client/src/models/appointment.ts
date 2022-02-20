export default class Appointment {
  id: string;
  from: string;
  to: string;

  public constructor(id: string, from: string, to: string){
    this.id = id;
    this.from = from;
    this.to = to;
  }

  public appointmentTime(sep: string) : string {
    return `${this.from}${sep}${this.to}`;
  }
}