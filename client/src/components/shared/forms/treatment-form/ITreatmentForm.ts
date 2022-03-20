import Treatment from "../../../../models/treatment";

export default interface ITreatmentForm {
  id?: string;
  onSubmit?: (appointment: Treatment) => void;
  readOnly?: boolean;
}
