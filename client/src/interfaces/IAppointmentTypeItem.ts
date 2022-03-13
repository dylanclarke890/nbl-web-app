import AppointmentType from "../models/appointment-type";

export default interface IAppointmentTypeItem {
  delay: number;
  selectAppointmentType: any;
  item: AppointmentType;
}
