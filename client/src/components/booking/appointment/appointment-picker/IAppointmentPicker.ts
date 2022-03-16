import Appointment from "../../../../models/appointment";

export default interface IAppointmentPicker {
  closeModal: any,
  availableTimes: Appointment[],
  date: Date,
  setSelectedTime: any,
  selectedTime: string,
  onError: any,
  onSuccessfulSubmit: any
}