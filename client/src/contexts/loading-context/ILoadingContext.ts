export default interface ILoadingContext {
  loading: boolean;
  isLoading: (displayText?: string) => void;
  loaded: () => void;
}