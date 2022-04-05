export default interface ICustomTextArea {
  inputId: string;
  value?: string;
  error: string;
  active: boolean;
  onChange: any;
  readonly?: boolean;
}
