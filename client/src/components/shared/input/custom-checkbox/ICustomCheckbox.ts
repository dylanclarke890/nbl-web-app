export default interface ICustomCheckbox {
  inputId: string;
  labelText: string;
  isChecked: boolean;
  onChange: any;
  readOnly?: boolean;
}
