interface ICustomInput {
  inputId: string;
  labelText?: string;
  value?: string;
  error: string;
  active: boolean;
  onChange: any;
  onKeyPress?: any;
  readonly?: boolean;
}
