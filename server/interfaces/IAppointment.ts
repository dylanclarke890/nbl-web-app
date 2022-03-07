import ITimeSlot from "./ITimeSlot";

export default interface IAppointment {
  _id: string;
  person: IPerson;
  date: Date;
  time: ITimeSlot;
  appointmentType: string;
}

export interface IPerson {
  name: string;
  email: string;
  phone: string;
} 