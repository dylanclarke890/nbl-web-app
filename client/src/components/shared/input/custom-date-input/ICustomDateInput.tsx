export default interface ICustomDateInput {
  inputId: string;
  labelText: string;
  value: Date;
  error: string;
  onChange?: any;
  readOnly?: boolean;
}