export interface INotification {
  message: string;
  received_credits: number;
}

export interface INotificationGroup {
  date: string;
  items: INotification[];
}

export interface INotificationResponse {
  data: INotificationGroup[];
  total: number;
}
