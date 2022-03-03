import ITimeSlot from "./ITimeSlot";

export default interface IAppointment {
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