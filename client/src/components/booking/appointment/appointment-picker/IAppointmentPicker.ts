import Appointment from "../../../../models/appointment";
import Treatment from "../../../../models/treatment";

export default interface IAppointmentPicker {
  closeModal: any;
  availableTimes: Appointment[];
  date: Date;
  setSelectedTime: any;
  selectedTime: string;
  treatment: Treatment;
  onError: any;
  onSuccessfulSubmit: any;
}
