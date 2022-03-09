import AppointmentType from "../models/appointment-type";

export default interface IAppointmentForm {
  id?: string;
  onSubmit?: (appointment: AppointmentType) => void;
  readOnly?: boolean;
}