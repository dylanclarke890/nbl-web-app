interface ICustomInput {
  inputId: string;
  value?: string;
  error: string;
  active: boolean;
  onChange: any;
  onKeyPress?: any;
  readonly?: boolean;
}
