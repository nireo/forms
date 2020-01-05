export interface Notification {
  message: string;
  actionName: string;
  actionFunction: () => void;
  autoHideTime: number;
}
