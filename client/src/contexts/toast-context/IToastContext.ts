export default interface IToastContext {
  createToast: (toastType: string, description: string) => void;
}
