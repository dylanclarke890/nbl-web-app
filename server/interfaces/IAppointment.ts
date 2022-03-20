import ITimeSlot from "./ITimeSlot";
import ITreatment from "./ITreatment";

export default interface IAppointment {
  _id: string;
  person: IPerson;
  date: Date;
  time: ITimeSlot;
  treatment: ITreatment;
}

export interface IPerson {
  name: string;
  email: string;
  phone: string;
}
