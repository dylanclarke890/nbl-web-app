import AppointmentType from "../models/appointment-type";

export default interface IAppointmentTypeForm {
  id?: string;
  onSubmit?: (appointment: AppointmentType) => void;
  readOnly?: boolean;
}